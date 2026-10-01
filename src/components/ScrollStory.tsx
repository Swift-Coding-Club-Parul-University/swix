import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMedia";

/**
 * A cinematic scroll-scrubbed sequence — the same technique Apple product
 * pages use (pin a tall section, map scroll position to a frame of an
 * animation) except every "frame" is drawn procedurally on a <canvas> instead
 * of decoded from a video or an image sequence. That means:
 *  - zero video/image bytes shipped for the whole scene
 *  - infinite resolution (redraws crisp at any DPR)
 *  - the "frame" is only computed when scroll actually changes (rAF-throttled,
 *    dirty-flag driven) — there is no idle animation loop burning battery
 * The narrative: scattered code fragments assemble into an app-icon mosaic,
 * the club's Swift mark resolves on top, then shipped apps orbit out.
 * Liquid ribbon waves flow underneath and radar rings sweep during assembly.
 */

const PALETTE = ["#F05138", "#FF7A5C", "#FF9B64", "#FFD3BC", "#FFE6D5", "#FFF3E6", "#E9BA9C", "#D63F27"];
const BIRD_PATH = "M47.0606,36.6607c-0.0014-0.0018-0.0027-0.0031-0.0042-0.0048c0.0657-0.2236,0.1335-0.4458,0.191-0.675c2.465-9.8209-3.5511-21.4319-13.7316-27.5454c4.4613,6.0479,6.4339,13.3733,4.6813,19.7795c-0.1563,0.5714-0.3442,1.1198-0.5519,1.6528c-0.2254-0.1481-0.5094-0.3162-0.8908-0.5265c0,0-10.1269-6.2527-21.1028-17.3122c-0.288-0.2903,5.8528,8.777,12.8219,16.1399c-3.2834-1.8427-12.4338-8.5004-18.2266-13.8023c0.7117,1.1869,1.5582,2.3298,2.4887,3.4301c4.8375,6.1349,11.1462,13.7044,18.7043,19.5169c-5.3104,3.2498-12.8141,3.5025-20.2852,0.0034c-1.8479-0.866-3.5851-1.9109-5.1932-3.0981c3.1625,5.0585,8.0332,9.4229,13.9613,11.9708c7.0695,3.0381,14.0996,2.8321,19.3356,0.0498l-0.0041,0.006c0.0239-0.0151,0.0543-0.0316,0.0791-0.0469c0.215-0.1156,0.4284-0.2333,0.6371-0.3576c2.5157-1.3058,7.4847-2.6306,10.1518,2.5588C50.7755,49.6699,52.1635,42.9395,47.0606,36.6607z";

const CAPTIONS = [
  { n: "01", at: 0.02, t: "Every great app starts as scattered ideas.", sub: "Weeks 1–2 · teams, ideas & Swift fundamentals", tag: "Scene 01 · Fragments" },
  { n: "02", at: 0.32, t: "Fourteen weeks turn fragments into structure.", sub: "Weeks 3–9 · build, review, repeat", tag: "Scene 02 · Assembly" },
  { n: "03", at: 0.58, t: "One semester. One shipped app.", sub: "Weeks 10–13 · TestFlight beta & polish", tag: "Scene 03 · Resolve" },
  { n: "04", at: 0.82, t: "Welcome to the Swift Coding Club.", sub: "Week 14 · Demo Day → App Store", tag: "Scene 04 · Orbit" },
];

type Tile = {
  sx: number; sy: number; srot: number; // scattered start
  tx: number; ty: number; trot: number; // target grid position
  size: number;
  sz: number;
  color: string;
  delay: number; // 0..1 stagger offset
};

type OrbiterShape = "droplet" | "diamond" | "ring" | "spark" | "gem" | "pulse";
const ORBIT_SHAPES: OrbiterShape[] = ["droplet", "diamond", "ring", "spark", "gem", "pulse"];
type Orbiter = { angle: number; shape: OrbiterShape; color: string; delay: number };

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildTiles(): Tile[] {
  const cols = 9;
  const rows = 8;
  const cell = 480 / cols;
  const tiles: Tile[] = [];
  let i = 0;
  const total = cols * rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const gx = -240 + c * cell + cell / 2;
      const gy = -220 + r * cell + cell / 2;
      // pseudo-random but deterministic scatter based on index
      const seed = i * 137.51;
      const angle = (seed % 360) * (Math.PI / 180);
      const radius = 420 + ((seed * 3.7) % 260);
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius * 0.72;
      const diag = (r + c) / (rows + cols);
      const color = PALETTE[Math.floor(diag * (PALETTE.length - 1) + ((i * 13) % 3) * 0.15) % PALETTE.length];
      tiles.push({
        sx,
        sy,
        srot: ((seed % 140) - 70) * (Math.PI / 180),
        tx: gx,
        ty: gy,
        trot: 0,
        size: cell - 7,
        sz: ((i * 97) % 640) - 320,
        color,
        delay: (Math.sqrt(gx * gx + gy * gy) / 340) * 0.55 + (i / total) * 0.15,
      });
      i++;
    }
  }
  return tiles;
}

function buildOrbiters(): Orbiter[] {
  return ORBIT_SHAPES.map((shape, i) => ({
    angle: (i / ORBIT_SHAPES.length) * Math.PI * 2,
    shape,
    color: PALETTE[i % PALETTE.length],
    delay: i * 0.05,
  }));
}

export function ScrollStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const sceneRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const tiles = useMemo(buildTiles, []);
  const orbiters = useMemo(buildOrbiters, []);
  const birdPath2D = useMemo(() => (typeof Path2D !== "undefined" ? new Path2D(BIRD_PATH) : null), []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    let dirty = true;
    let visible = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      dirty = true;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) dirty = true;
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = (p: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width, height) / 900;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(scale, scale);

      // ambient backdrop glow
      const glowT = clamp01((p - 0.5) / 0.4);
      if (glowT > 0) {
        const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 420);
        g.addColorStop(0, `rgba(240,81,56,${0.14 * glowT})`);
        g.addColorStop(1, "rgba(240,81,56,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, 420, 0, Math.PI * 2);
        ctx.fill();
      }

      // liquid metal waves — thick curvy lines with molten metal material
      const metalWaves = [
        { baseY: -220, amp: 70, freq: 0.004, speed: 6, phase: 0, width: 32, alpha: 0.5 },
        { baseY: -150, amp: 55, freq: 0.005, speed: -4.5, phase: 1.8, width: 20, alpha: 0.4 },
        { baseY: 195, amp: 65, freq: 0.0035, speed: 5.5, phase: 3.5, width: 26, alpha: 0.45 },
      ];
      const mwAlpha = clamp01((p - 0.03) / 0.1) * (1 - clamp01((p - 0.9) / 0.08));
      if (mwAlpha > 0) {
        for (const w of metalWaves) {
          const pts: { x: number; y: number }[] = [];
          for (let x = -560; x <= 560; x += 5) {
            const y = w.baseY
              + Math.sin(x * w.freq + p * w.speed + w.phase) * w.amp
              + Math.sin(x * 0.0025 + p * 3 + w.phase) * 24
              + Math.sin(x * 0.007 + p * 2 + w.phase * 1.5) * 12;
            pts.push({ x, y });
          }
          // thick filled wave body — top half lighter, bottom half darker
          ctx.save();
          ctx.globalAlpha = mwAlpha;
          ctx.beginPath();
          for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            const normal = i < pts.length - 1
              ? { x: -(pts[i + 1].y - p1.y), y: pts[i + 1].x - p1.x }
              : { x: -(p1.y - pts[i - 1].y), y: p1.x - pts[i - 1].x };
            const len = Math.hypot(normal.x, normal.y) || 1;
            const nx = (normal.x / len) * w.width * 0.5;
            const ny = (normal.y / len) * w.width * 0.5;
            if (i === 0) ctx.moveTo(p1.x + nx, p1.y + ny);
            else ctx.lineTo(p1.x + nx, p1.y + ny);
          }
          for (let i = pts.length - 1; i >= 0; i--) {
            const p1 = pts[i];
            const normal = i < pts.length - 1
              ? { x: -(pts[i + 1].y - p1.y), y: pts[i + 1].x - p1.x }
              : { x: -(p1.y - pts[i - 1].y), y: p1.x - pts[i - 1].x };
            const len = Math.hypot(normal.x, normal.y) || 1;
            const nx = (normal.x / len) * w.width * 0.5;
            const ny = (normal.y / len) * w.width * 0.5;
            ctx.lineTo(p1.x - nx, p1.y - ny);
          }
          ctx.closePath();
          // metallic gradient along the wave
          const mg = ctx.createLinearGradient(0, w.baseY - 80, 0, w.baseY + 80);
          mg.addColorStop(0, "rgba(255,255,255,0.35)");
          mg.addColorStop(0.2, "#FFD3BC");
          mg.addColorStop(0.45, "#F05138");
          mg.addColorStop(0.7, "#C2B8A3");
          mg.addColorStop(1, "rgba(11,11,12,0.2)");
          ctx.fillStyle = mg;
          ctx.shadowColor = "#F05138";
          ctx.shadowBlur = 22;
          ctx.fill();
          ctx.shadowBlur = 0;
          // specular highlight — bright line along top edge
          ctx.beginPath();
          for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            const normal = i < pts.length - 1
              ? { x: -(pts[i + 1].y - p1.y), y: pts[i + 1].x - p1.x }
              : { x: -(p1.y - pts[i - 1].y), y: p1.x - pts[i - 1].x };
            const len = Math.hypot(normal.x, normal.y) || 1;
            const nx = (normal.x / len) * w.width * 0.48;
            const ny = (normal.y / len) * w.width * 0.48;
            if (i === 0) ctx.moveTo(p1.x + nx, p1.y + ny);
            else ctx.lineTo(p1.x + nx, p1.y + ny);
          }
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          // dark edge line along bottom
          ctx.beginPath();
          for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            const normal = i < pts.length - 1
              ? { x: -(pts[i + 1].y - p1.y), y: pts[i + 1].x - p1.x }
              : { x: -(p1.y - pts[i - 1].y), y: p1.x - pts[i - 1].x };
            const len = Math.hypot(normal.x, normal.y) || 1;
            const nx = (normal.x / len) * w.width * 0.48;
            const ny = (normal.y / len) * w.width * 0.48;
            if (i === 0) ctx.moveTo(p1.x - nx, p1.y - ny);
            else ctx.lineTo(p1.x - nx, p1.y - ny);
          }
          ctx.strokeStyle = "rgba(11,11,12,0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }

      // radar rings sweep while assembling
      if (p > 0.12 && p < 0.72) {
        const window_ = clamp01((p - 0.12) / 0.08) * (1 - clamp01((p - 0.62) / 0.1));
        for (let k = 0; k < 3; k++) {
          const rr = (((p * 1.4 + k / 3) % 1) + 1) % 1;
          const radius = 60 + rr * 340;
          ctx.globalAlpha = (1 - rr) * 0.18 * window_;
          ctx.strokeStyle = "#F05138";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // clip to rounded "app icon" boundary once tiles are mostly assembled
      const assembleT = clamp01((p - 0.28) / 0.42);

      for (const tile of tiles) {
        const local = clamp01((assembleT - tile.delay) / (1 - tile.delay || 1));
        const e = easeOutCubic(local);
        const x = lerp(tile.sx, tile.tx, e);
        const y = lerp(tile.sy, tile.ty, e);
        const rot = lerp(tile.srot, tile.trot, e);
        const scatterOpacity = clamp01(p / 0.06);
        const size = tile.size * lerp(0.7, 1, e);

        ctx.save();
        ctx.globalAlpha = scatterOpacity;
        ctx.translate(x, y);
        ctx.rotate(rot);
        // wobbly organic tile shape — edges undulate like liquid metal
        const hs = size / 2;
        const wobble = (1 - e) * 8 + 2; // more wobble when scattered, less when assembled
        ctx.beginPath();
        ctx.moveTo(-hs + Math.sin(p * 3 + tile.sx * 0.01) * wobble, -hs);
        ctx.bezierCurveTo(
          -hs * 0.3, -hs - Math.sin(p * 2.5 + tile.sy * 0.01) * wobble,
          hs * 0.3, -hs + Math.cos(p * 2.8 + tile.sx * 0.02) * wobble,
          hs, -hs + Math.sin(p * 3.2 + tile.sy * 0.015) * wobble
        );
        ctx.bezierCurveTo(
          hs + Math.cos(p * 2.7 + tile.sx * 0.01) * wobble, -hs * 0.3,
          hs - Math.sin(p * 3.1 + tile.sy * 0.02) * wobble, hs * 0.3,
          hs + Math.cos(p * 2.9 + tile.sx * 0.015) * wobble, hs
        );
        ctx.bezierCurveTo(
          hs * 0.3, hs + Math.sin(p * 2.6 + tile.sy * 0.01) * wobble,
          -hs * 0.3, hs - Math.cos(p * 3 + tile.sx * 0.02) * wobble,
          -hs + Math.sin(p * 2.8 + tile.sy * 0.015) * wobble, hs
        );
        ctx.bezierCurveTo(
          -hs - Math.cos(p * 3.2 + tile.sx * 0.01) * wobble, hs * 0.3,
          -hs + Math.sin(p * 2.9 + tile.sy * 0.02) * wobble, -hs * 0.3,
          -hs + Math.sin(p * 3 + tile.sx * 0.01) * wobble, -hs
        );
        ctx.closePath();
        ctx.fillStyle = tile.color;
        ctx.fill();
        if (e > 0.94) {
          ctx.globalAlpha = scatterOpacity * 0.25;
          ctx.strokeStyle = "rgba(11,11,12,0.15)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      // brand mark reveal — white bird inside a rounded app-icon plate
      const markT = clamp01((p - 0.56) / 0.22);
      if (markT > 0 && birdPath2D) {
        const e = markT < 1 ? easeInOutCubic(markT) : 1;
        const pop = easeOutBack(clamp01(markT / 0.55));
        const breathe = 1 + Math.sin(p * 30) * 0.012;
        const plate = 208 * pop;
        // rounded-square plate with soft gradient + ring — the "shipped app icon"
        ctx.save();
        ctx.globalAlpha = e;
        ctx.translate(-plate / 2, -plate / 2);
        const r = plate * 0.225;
        ctx.beginPath();
        ctx.moveTo(plate - r, 0);
        ctx.arcTo(plate, 0, plate, plate, r);
        ctx.arcTo(plate, plate, 0, plate, r);
        ctx.arcTo(0, plate, 0, 0, r);
        ctx.arcTo(0, 0, plate, 0, r);
        ctx.closePath();
        const pg = ctx.createLinearGradient(0, 0, plate, plate);
        pg.addColorStop(0, "#FF7A5C");
        pg.addColorStop(0.5, "#F05138");
        pg.addColorStop(1, "#D63F27");
        ctx.fillStyle = pg;
        ctx.shadowColor = "rgba(240,81,56,0.45)";
        ctx.shadowBlur = 36;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // rotating dashed halo around the plate
        ctx.translate(plate / 2, plate / 2);
        ctx.globalAlpha = e * 0.5;
        ctx.strokeStyle = "#F05138";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 13]);
        ctx.lineDashOffset = -p * 220;
        ctx.beginPath();
        ctx.arc(0, 0, plate * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        // bird — white, glowing, centered on the plate
        ctx.save();
        ctx.globalAlpha = e;
        const s = (plate / 56) * 0.62 * breathe;
        ctx.scale(s, s);
        ctx.translate(-32, -32);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(214,63,39,0.55)";
        ctx.shadowBlur = 18;
        ctx.fill(birdPath2D);
        ctx.shadowBlur = 0;
        ctx.fill(birdPath2D);
        ctx.restore();
      }

      // orbiters
      const orbitT = clamp01((p - 0.78) / 0.22);
      if (orbitT > 0) {
        const radius = lerp(0, 300, easeOutCubic(orbitT));
        ctx.save();
        ctx.globalAlpha = orbitT;
        ctx.strokeStyle = "rgba(11,11,12,0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 10]);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        // tilted second orbit
        ctx.save();
        ctx.rotate(-0.35);
        ctx.scale(1, 0.55);
        ctx.strokeStyle = "rgba(240,81,56,0.15)";
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.setLineDash([]);
        // satellites on tilted orbit
        const tiltA = -0.35;
        const cosT = Math.cos(tiltA);
        const sinT = Math.sin(tiltA);
        for (let k = 0; k < 3; k++) {
          const a = p * 4 + (k * Math.PI * 2) / 3;
          const ex = Math.cos(a) * radius * 1.18;
          const ey = Math.sin(a) * radius * 1.18 * 0.55;
          ctx.save();
          ctx.globalAlpha = orbitT * 0.9;
          ctx.translate(ex * cosT - ey * sinT, ex * sinT + ey * cosT);
          ctx.fillStyle = PALETTE[(k + 2) % PALETTE.length];
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        for (const o of orbiters) {
          const local = clamp01((orbitT - o.delay) / (1 - o.delay || 1));
          const r = radius * easeOutCubic(local);
          const ox = Math.cos(o.angle + p * 1.2) * r;
          const oy = Math.sin(o.angle + p * 1.2) * r * 0.9;
          const sz = 16;
          ctx.save();
          ctx.globalAlpha = local;
          ctx.translate(ox, oy);
          // liquid metal orbiter shapes
          ctx.fillStyle = o.color;
          ctx.strokeStyle = o.color;
          ctx.lineWidth = 1.5;
          if (o.shape === "droplet") {
            // mercury droplet
            ctx.beginPath();
            ctx.moveTo(0, -sz);
            ctx.bezierCurveTo(sz * 0.8, -sz * 0.3, sz * 0.7, sz * 0.5, 0, sz);
            ctx.bezierCurveTo(-sz * 0.7, sz * 0.5, -sz * 0.8, -sz * 0.3, 0, -sz);
            ctx.closePath();
            ctx.fill();
          } else if (o.shape === "diamond") {
            // faceted gem
            ctx.beginPath();
            ctx.moveTo(0, -sz);
            ctx.lineTo(sz * 0.6, 0);
            ctx.lineTo(0, sz);
            ctx.lineTo(-sz * 0.6, 0);
            ctx.closePath();
            ctx.fill();
          } else if (o.shape === "ring") {
            // hollow ring
            ctx.beginPath();
            ctx.arc(0, 0, sz * 0.7, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, sz * 0.35, 0, Math.PI * 2);
            ctx.stroke();
          } else if (o.shape === "spark") {
            // 4-point star
            ctx.beginPath();
            for (let k = 0; k < 8; k++) {
              const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
              const rad = k % 2 === 0 ? sz : sz * 0.35;
              const sx2 = Math.cos(a) * rad;
              const sy2 = Math.sin(a) * rad;
              if (k === 0) ctx.moveTo(sx2, sy2);
              else ctx.lineTo(sx2, sy2);
            }
            ctx.closePath();
            ctx.fill();
          } else if (o.shape === "gem") {
            // hexagonal gem
            ctx.beginPath();
            for (let k = 0; k < 6; k++) {
              const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
              const sx2 = Math.cos(a) * sz * 0.75;
              const sy2 = Math.sin(a) * sz * 0.75;
              if (k === 0) ctx.moveTo(sx2, sy2);
              else ctx.lineTo(sx2, sy2);
            }
            ctx.closePath();
            ctx.fill();
          } else {
            // pulse — concentric circles
            ctx.globalAlpha = local * 0.6;
            ctx.beginPath();
            ctx.arc(0, 0, sz, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = local;
            ctx.beginPath();
            ctx.arc(0, 0, sz * 0.45, 0, Math.PI * 2);
            ctx.fill();
          }
          // specular highlight on each shape
          ctx.globalAlpha = local * 0.4;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-sz * 0.2, -sz * 0.25, sz * 0.22, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      }

      ctx.restore();
    };

    let lastP = -1;
    const update = () => {
      dirty = false;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp01(total > 0 ? -rect.top / total : 0);
      if (Math.abs(p - lastP) > 0.0008) {
        lastP = p;
        draw(p);
        // HTML overlays — written directly to avoid React re-render per scroll tick
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        if (timecodeRef.current) {
          const totalFrames = 96;
          const f = Math.round(p * totalFrames);
          const sec = Math.floor(f / 24);
          timecodeRef.current.textContent = `00:0${sec}:${String(f % 24).padStart(2, "0")}`;
        }
        const activeIdx = CAPTIONS.reduce((acc, c, i) => (p >= c.at ? i : acc), 0);
        if (sceneRef.current) sceneRef.current.textContent = CAPTIONS[activeIdx].tag;
        captionRefs.current.forEach((el, i) => {
          if (!el) return;
          const c = CAPTIONS[i];
          const next = CAPTIONS[i + 1]?.at ?? 1.05;
          const fadeIn = clamp01((p - c.at) / 0.06);
          const fadeOut = 1 - clamp01((p - (next - 0.08)) / 0.08);
          const op = Math.min(fadeIn, fadeOut);
          el.style.opacity = String(op);
          el.style.transform = `translate3d(0, ${(1 - fadeIn) * 16}px, 0)`;
        });
        // scrubber dots
        dotRefs.current.forEach((el, i) => {
          if (!el) return;
          const done = p >= CAPTIONS[i].at;
          const current = activeIdx === i;
          el.style.background = done ? "#F05138" : "rgba(11,11,12,0.15)";
          el.style.transform = `scale(${current ? 1.5 : 1})`;
          el.style.boxShadow = current ? "0 0 0 4px rgba(240,81,56,0.2)" : "none";
        });
      }
    };

    const onScroll = () => {
      if (!visible) return;
      dirty = true;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        if (dirty) update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [tiles, orbiters, birdPath2D, reduce]);

  if (reduce) {
    return (
      <section id="story" className="cv-auto relative overflow-hidden bg-warm py-24 text-center">
        <div className="container-x">
          <p className="eyebrow">Our story</p>
          <h2 className="display mx-auto mt-4 max-w-2xl text-balance text-4xl">
            Fragments become a finished app — <span className="text-gradient">every single semester.</span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="story" ref={wrapRef} className="relative h-[280vh] sm:h-[420vh]">
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden bg-warm">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 dot-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          {/* cinematic vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(11,11,12,0.10) 100%)" }} />
        </div>

        {/* liquid morph blobs drifting behind canvas */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="gpu animate-morph absolute -left-32 top-[8%] h-[46vmin] w-[46vmin] rounded-full bg-swift/20 blur-3xl" />
          <div className="gpu animate-morph absolute -right-32 bottom-[6%] h-[52vmin] w-[52vmin] rounded-full bg-swift-soft/30 blur-3xl" style={{ animationDelay: "-9s" }} />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden role="presentation" />

        {/* film-style HUD chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-24 flex items-center justify-between px-6 sm:px-10">
          <span className="liquid rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
            Swift Coding Club · Reel
          </span>
          <span ref={sceneRef} className="liquid rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
            Scene 01 · Fragments
          </span>
        </div>

        {/* captions */}
        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
          {CAPTIONS.map((c, i) => (
            <div
              key={c.t}
              ref={(el) => { captionRefs.current[i] = el; }}
              className="absolute inset-x-0 transition-opacity"
              style={{ opacity: 0 }}
            >
              <span aria-hidden className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-mono text-[11rem] font-bold leading-none text-stroke opacity-40 sm:text-[15rem]">
                {c.n}
              </span>
              <p className="relative font-mono text-[11px] uppercase tracking-[0.28em] text-swift-deep">{c.sub}</p>
              <h3 className="display relative mt-3 text-balance text-3xl sm:text-5xl">{c.t}</h3>
            </div>
          ))}
        </div>

        {/* bottom timeline / scrubber chrome */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 px-6 sm:px-10">
          <div className="liquid mx-auto flex max-w-lg items-center gap-3 rounded-full px-4 py-2.5">
            <span ref={timecodeRef} className="font-mono text-[11px] tabular-nums text-ink/70">00:00:00</span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
              <div ref={barRef} className="gpu absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-swift to-swift-soft" style={{ transform: "scaleX(0)" }} />
            </div>
            <span className="flex items-center gap-1.5" aria-hidden>
              {CAPTIONS.map((c, i) => (
                <span
                  key={c.n}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="gpu h-1.5 w-1.5 rounded-full transition-all"
                  style={{ background: "rgba(11,11,12,0.15)" }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
