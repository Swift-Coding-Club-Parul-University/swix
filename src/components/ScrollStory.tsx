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
 * The narrative is drawn like a risograph print proof — hard ink-outlined
 * tiles, misregistered colour passes, a scanline that assembles the mosaic
 * column by column, a halftone burst when the club mark lands, then a
 * SHIPPED stamp that slams the camera. Fragments assemble into an app-icon
 * mosaic, the club's Swift mark resolves on top, then shipped apps orbit out.
 */

const PALETTE = ["#F05138", "#FF7A5C", "#FF9B64", "#FFD3BC", "#FFE6D5", "#FFF3E6", "#E9BA9C", "#D63F27"];
const INK = "#0b0b0c";
const SWIFT = "#f05138";
const MONO = '"JetBrains Mono", ui-monospace, monospace';
const BIRD_PATH = "M47.0606,36.6607c-0.0014-0.0018-0.0027-0.0031-0.0042-0.0048c0.0657-0.2236,0.1335-0.4458,0.191-0.675c2.465-9.8209-3.5511-21.4319-13.7316-27.5454c4.4613,6.0479,6.4339,13.3733,4.6813,19.7795c-0.1563,0.5714-0.3442,1.1198-0.5519,1.6528c-0.2254-0.1481-0.5094-0.3162-0.8908-0.5265c0,0,-10.1269-6.2527-21.1028-17.3122c-0.288-0.2903,5.8528,8.777,12.8219,16.1399c-3.2834-1.8427-12.4338-8.5004-18.2266-13.8023c0.7117,1.1869,1.5582,2.3298,2.4887,3.4301c4.8375,6.1349,11.1462,13.7044,18.7043,19.5169c-5.3104,3.2498-12.8141,3.5025-20.2852,0.0034c-1.8479-0.866-3.5851-1.9109-5.1932-3.0981c3.1625,5.0585,8.0332,9.4229,13.9613,11.9708c7.0695,3.0381,14.0996,2.8321,19.3356,0.0498l-0.0041,0.006c0.0239-0.0151,0.0543-0.0316,0.0791-0.0469c0.215-0.1156,0.4284-0.2333,0.6371-0.3576c2.5157-1.3058,7.4847-2.6306,10.1518,2.5588C50.7755,49.6699,52.1635,42.9395,47.0606,36.6607z";

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
  delay: number; // 0..1 stagger offset (column-first so the scanline sweep reads)
};

type OrbiterShape = "square" | "cross" | "disc" | "tri" | "half" | "ring";
const ORBIT_SHAPES: OrbiterShape[] = ["square", "cross", "disc", "tri", "half", "ring"];
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
        delay: (c / (cols - 1)) * 0.58 + (i / total) * 0.06,
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

/** Bauhaus-ish hard shapes — no liquid curves, just ink-stamped geometry. */
function paintShape(ctx: CanvasRenderingContext2D, shape: OrbiterShape, s: number, mode: "fill" | "stroke") {
  if (shape === "cross") {
    const t = s * 0.42;
    const l = s * 0.92;
    if (mode === "fill") {
      ctx.fillRect(-t / 2, -l / 2, t, l);
      ctx.fillRect(-l / 2, -t / 2, l, t);
    } else {
      ctx.lineWidth = 2.5;
      ctx.strokeRect(-t / 2, -l / 2, t, l);
      ctx.strokeRect(-l / 2, -t / 2, l, t);
    }
    return;
  }
  if (shape === "ring") {
    ctx.lineWidth = s * 0.3;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  if (shape === "square") {
    ctx.rect(-s * 0.78, -s * 0.78, s * 1.56, s * 1.56);
  } else if (shape === "disc") {
    ctx.arc(0, 0, s * 0.78, 0, Math.PI * 2);
  } else if (shape === "tri") {
    ctx.moveTo(0, -s * 0.88);
    ctx.lineTo(s * 0.8, s * 0.62);
    ctx.lineTo(-s * 0.8, s * 0.62);
    ctx.closePath();
  } else {
    // half disc
    ctx.arc(0, 0, s * 0.8, Math.PI, 0);
    ctx.closePath();
  }
  ctx.fill();
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
      const zoom = 1 + 0.05 * Math.sin(p * Math.PI);
      let shakeX = 0;
      let shakeY = 0;
      if (p > 0.885 && p < 0.935) {
        const k = 1 - (p - 0.885) / 0.05;
        shakeX = Math.sin(p * 260) * 6 * k;
        shakeY = Math.cos(p * 300) * 5 * k;
      }
      ctx.save();
      ctx.translate(width / 2 + shakeX, height / 2 + shakeY);
      ctx.scale(scale * zoom, scale * zoom);

      // registration marks — print-proof corners
      const regA = clamp01(p / 0.05) * 0.3;
      if (regA > 0) {
        ctx.strokeStyle = `rgba(11,11,12,${regA})`;
        ctx.lineWidth = 1.5;
        for (const [rx, ry] of [[-400, -400], [400, -400], [-400, 400], [400, 400]] as const) {
          ctx.beginPath();
          ctx.arc(rx, ry, 9, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(rx - 16, ry);
          ctx.lineTo(rx + 16, ry);
          ctx.moveTo(rx, ry - 16);
          ctx.lineTo(rx, ry + 16);
          ctx.stroke();
        }
      }

      // misprint contour waves — three offset passes, no soft gradients
      const mwAlpha = clamp01((p - 0.03) / 0.1) * (1 - clamp01((p - 0.9) / 0.08));
      if (mwAlpha > 0) {
        const waves = [
          { baseY: -220, amp: 70, freq: 0.004, speed: 6, phase: 0 },
          { baseY: -150, amp: 55, freq: 0.005, speed: -4.5, phase: 1.8 },
          { baseY: 195, amp: 65, freq: 0.0035, speed: 5.5, phase: 3.5 },
        ];
        const passes = [
          { dx: -6, dy: -5, color: SWIFT, lw: 12, a: 0.55 },
          { dx: 5, dy: 4, color: "#FFD3BC", lw: 12, a: 0.5 },
          { dx: 0, dy: 0, color: INK, lw: 3, a: 0.85 },
        ];
        for (const w of waves) {
          const pts: { x: number; y: number }[] = [];
          for (let x = -560; x <= 560; x += 8) {
            const y = w.baseY
              + Math.sin(x * w.freq + p * w.speed + w.phase) * w.amp
              + Math.sin(x * 0.0025 + p * 3 + w.phase) * 24
              + Math.sin(x * 0.007 + p * 2 + w.phase * 1.5) * 12;
            pts.push({ x, y });
          }
          for (const pass of passes) {
            ctx.save();
            ctx.globalAlpha = mwAlpha * pass.a;
            ctx.strokeStyle = pass.color;
            ctx.lineWidth = pass.lw;
            ctx.beginPath();
            pts.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x + pass.dx, pt.y + pass.dy) : ctx.lineTo(pt.x + pass.dx, pt.y + pass.dy)));
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // halftone burst behind the mark
      const markT = clamp01((p - 0.56) / 0.22);
      if (markT > 0) {
        const R = 330 * easeOutCubic(markT);
        const step = 26;
        ctx.fillStyle = INK;
        for (let gy = -R; gy <= R; gy += step) {
          for (let gx = -R; gx <= R; gx += step) {
            const d = Math.hypot(gx, gy);
            if (d > R) continue;
            const k = 1 - d / R;
            ctx.globalAlpha = k * k * 0.4 * markT;
            const dr = 1 + k * 3.4;
            ctx.fillRect(gx - dr / 2, gy - dr / 2, dr, dr);
          }
        }
        ctx.globalAlpha = 1;
      }

      // radar rings sweep while assembling
      if (p > 0.12 && p < 0.72) {
        const window_ = clamp01((p - 0.12) / 0.08) * (1 - clamp01((p - 0.62) / 0.1));
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 8]);
        for (let k = 0; k < 3; k++) {
          const rr = (((p * 1.4 + k / 3) % 1) + 1) % 1;
          const radius = 60 + rr * 340;
          ctx.globalAlpha = (1 - rr) * 0.25 * window_;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // scanline sweep — the assembly reads column by column
      const sweepT = clamp01((p - 0.28) / 0.44);
      if (sweepT > 0 && sweepT < 1) {
        const sx = lerp(-296, 296, sweepT);
        ctx.save();
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = SWIFT;
        ctx.fillRect(sx - 44, -300, 44, 600);
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sx, -300);
        ctx.lineTo(sx, 300);
        ctx.stroke();
        ctx.lineWidth = 2;
        for (let ty = -280; ty <= 280; ty += 70) {
          ctx.beginPath();
          ctx.moveTo(sx - 9, ty);
          ctx.lineTo(sx + 9, ty);
          ctx.stroke();
        }
        ctx.restore();
      }

      // tiles — hard squares with ink outlines + offset shadow blocks
      const assembleT = clamp01((p - 0.28) / 0.44);
      for (const tile of tiles) {
        const local = clamp01((assembleT - tile.delay) / (1 - tile.delay || 1));
        const e = easeOutCubic(local);
        const er = easeOutBack(clamp01(local * 1.08));
        const x = lerp(tile.sx, tile.tx, e);
        const y = lerp(tile.sy, tile.ty, e);
        const rot = lerp(tile.srot, tile.trot, er);
        const scatterOpacity = clamp01(p / 0.06);
        const size = tile.size * lerp(0.72, 1, e);
        const hs = size / 2;

        ctx.save();
        ctx.globalAlpha = scatterOpacity;
        ctx.translate(x, y);
        ctx.rotate(rot);
        if (e > 0.3) {
          ctx.globalAlpha = scatterOpacity * ((e - 0.3) / 0.7) * 0.9;
          ctx.fillStyle = INK;
          ctx.fillRect(-hs + 4.5, -hs + 4.5, size, size);
        }
        ctx.globalAlpha = scatterOpacity;
        ctx.fillStyle = tile.color;
        ctx.fillRect(-hs, -hs, size, size);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.globalAlpha = scatterOpacity * (0.25 + e * 0.75);
        ctx.strokeRect(-hs, -hs, size, size);
        ctx.restore();
      }

      // BUILD counter
      if (p > 0.28 && p < 0.8) {
        const bt = clamp01((p - 0.28) / 0.44);
        ctx.save();
        ctx.globalAlpha = clamp01((p - 0.28) / 0.05);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = INK;
        ctx.font = `700 26px ${MONO}`;
        ctx.letterSpacing = "2px";
        ctx.fillText(`BUILD ${String(Math.round(bt * 100)).padStart(3, "0")}%`, -320, 300);
        ctx.letterSpacing = "0px";
        ctx.fillStyle = SWIFT;
        ctx.fillRect(-320, 310, 170 * bt, 8);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.strokeRect(-320, 310, 170, 8);
        ctx.restore();
      }

      // brand mark — app-icon plate with a misregistration flash on impact
      if (markT > 0 && birdPath2D) {
        const e = markT < 1 ? easeInOutCubic(markT) : 1;
        const pop = easeOutBack(clamp01(markT / 0.55));
        const breathe = 1 + Math.sin(p * 30) * 0.012;
        const plate = 208 * pop;

        const platePath = () => {
          const r = plate * 0.225;
          ctx.beginPath();
          ctx.moveTo(plate - r, 0);
          ctx.arcTo(plate, 0, plate, plate, r);
          ctx.arcTo(plate, plate, 0, plate, r);
          ctx.arcTo(0, plate, 0, 0, r);
          ctx.arcTo(0, 0, plate, 0, r);
          ctx.closePath();
        };

        const flashT = markT < 0.4 ? 1 - markT / 0.4 : 0;
        if (flashT > 0) {
          ctx.save();
          ctx.globalAlpha = flashT * 0.45;
          ctx.translate(-7 * flashT, 5 * flashT);
          ctx.fillStyle = INK;
          platePath();
          ctx.fill();
          ctx.restore();
        }

        ctx.save();
        ctx.globalAlpha = e;
        ctx.translate(-plate / 2, -plate / 2);
        const pg = ctx.createLinearGradient(0, 0, plate, plate);
        pg.addColorStop(0, "#FF7A5C");
        pg.addColorStop(0.5, "#F05138");
        pg.addColorStop(1, "#D63F27");
        ctx.fillStyle = pg;
        ctx.shadowColor = "rgba(240,81,56,0.45)";
        ctx.shadowBlur = 36;
        platePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 2.5;
        ctx.stroke();
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

      // SHIPPED stamp — slams in with an impact shake
      const stampT = clamp01((p - 0.885) / 0.07);
      if (stampT > 0) {
        const se = easeOutBack(stampT);
        const s = lerp(1.9, 1, se);
        const rotS = lerp(-0.38, -0.1, easeOutCubic(stampT));
        ctx.save();
        ctx.globalAlpha = clamp01(stampT * 1.5) * 0.92;
        ctx.translate(170, 210);
        ctx.rotate(rotS);
        ctx.scale(s, s);
        const bw = 250;
        const bh = 78;
        ctx.fillStyle = INK;
        ctx.fillRect(-bw / 2 + 7, -bh / 2 + 7, bw, bh);
        ctx.fillStyle = SWIFT;
        ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 4;
        ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
        ctx.fillStyle = "#fffdf8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `700 34px ${MONO}`;
        ctx.letterSpacing = "3px";
        ctx.fillText("SHIPPED.", 0, 2);
        ctx.letterSpacing = "0px";
        ctx.restore();
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }

      // orbiters — hard shapes with offset ink shadows
      const orbitT = clamp01((p - 0.78) / 0.22);
      if (orbitT > 0) {
        const radius = lerp(0, 300, easeOutCubic(orbitT));
        ctx.save();
        ctx.globalAlpha = orbitT;
        ctx.strokeStyle = "rgba(11,11,12,0.2)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 10]);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.save();
        ctx.rotate(-0.35);
        ctx.scale(1, 0.55);
        ctx.strokeStyle = "rgba(240,81,56,0.25)";
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
          ctx.fillStyle = INK;
          ctx.fillRect(-5, -5, 10, 10);
          ctx.fillStyle = PALETTE[(k + 2) % PALETTE.length];
          ctx.fillRect(-3, -3, 6, 6);
          ctx.restore();
        }

        for (const o of orbiters) {
          const local = clamp01((orbitT - o.delay) / (1 - o.delay || 1));
          const r = radius * easeOutCubic(local);
          const ox = Math.cos(o.angle + p * 1.2) * r;
          const oy = Math.sin(o.angle + p * 1.2) * r * 0.9;
          const sz = 17;
          const mode = o.shape === "ring" ? "stroke" : "fill";
          ctx.save();
          ctx.globalAlpha = local;
          ctx.translate(ox, oy);
          ctx.rotate(p * 2.4 + o.angle);
          ctx.save();
          ctx.translate(4, 4);
          ctx.globalAlpha = local * 0.85;
          ctx.fillStyle = INK;
          ctx.strokeStyle = INK;
          paintShape(ctx, o.shape, sz, mode);
          ctx.restore();
          ctx.fillStyle = o.color;
          ctx.strokeStyle = INK;
          ctx.lineWidth = 2.5;
          paintShape(ctx, o.shape, sz, mode);
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
          el.style.transform = `scale(${current ? 1.4 : 1})`;
          el.style.boxShadow = current ? "3px 3px 0 rgba(11,11,12,0.9)" : "none";
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
          {/* print scanlines */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(11,11,12,0.9) 0 1px, transparent 1px 5px)", opacity: 0.05 }}
          />
          {/* cinematic vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(11,11,12,0.10) 100%)" }} />
        </div>

        {/* liquid morph blobs drifting behind canvas */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="gpu animate-morph absolute -left-32 top-[8%] h-[46vmin] w-[46vmin] bg-swift/20 blur-3xl" />
          <div className="gpu animate-morph absolute -right-32 bottom-[6%] h-[52vmin] w-[52vmin] bg-swift-soft/30 blur-3xl" style={{ animationDelay: "-9s" }} />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden role="presentation" />

        {/* film-style HUD chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-24 flex items-center justify-between px-6 sm:px-10">
          <span className="brutal-box inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
            <span aria-hidden className="h-2 w-2 bg-swift" />
            Swift Coding Club · Reel 001
          </span>
          <span ref={sceneRef} className="brutal-box px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
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
              <h3 className="display hard-shadow relative mt-3 text-balance text-3xl sm:text-5xl">{c.t}</h3>
            </div>
          ))}
        </div>

        {/* bottom timeline / scrubber chrome */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 px-6 sm:px-10">
          <div className="brutal-box mx-auto flex max-w-lg items-center gap-3 px-4 py-2.5">
            <span ref={timecodeRef} className="font-mono text-[11px] tabular-nums text-ink/80">00:00:00</span>
            <div className="relative h-2 flex-1 bg-ink/10">
              <div ref={barRef} className="gpu absolute inset-y-0 left-0 w-full origin-left bg-swift" style={{ transform: "scaleX(0)" }} />
            </div>
            <span className="flex items-center gap-1.5" aria-hidden>
              {CAPTIONS.map((c, i) => (
                <span
                  key={c.n}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="gpu h-2.5 w-2.5 transition-all"
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
