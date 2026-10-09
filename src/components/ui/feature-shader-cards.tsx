"use client"

import type React from "react"
import { Warp } from "@paper-design/shaders-react"
import { useIsMobile } from "@/hooks/useMedia"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

const features: Feature[] = [
  {
    title: "Elegant Design",
    description:
      "Beautiful shader effects that enhance your content without overwhelming it. Perfect for modern web experiences.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "High Performance",
    description: "Optimized WebGL shaders that run smoothly on all devices while maintaining stunning visual quality.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
  },
  {
    title: "Easy Integration",
    description: "Simple React components that can be dropped into any project with minimal configuration required.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
  {
    title: "Customizable",
    description: "Extensive customization options to match your brand colors, animations, and visual style perfectly.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Responsive",
    description: "Fully responsive design that looks great on desktop, tablet, and mobile devices of all sizes.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zM7 18V6h10v12H7z" />
      </svg>
    ),
  },
  {
    title: "Modern Tech",
    description: "Built with the latest web technologies including WebGL, React, and TypeScript for reliability.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
]

export function getShaderConfig(index: number) {
  const configs = [
    {
      proportion: 0.3,
      softness: 0.9,
      distortion: 0.12,
      swirl: 0.5,
      swirlIterations: 8,
      shape: "checks" as const,
      shapeScale: 0.07,
      colors: ["#d9cfff", "#ece3ff", "#ffc6dd", "#e8d5f5"],
    },
    {
      proportion: 0.38,
      softness: 1.1,
      distortion: 0.18,
      swirl: 0.7,
      swirlIterations: 10,
      shape: "dots" as const,
      shapeScale: 0.1,
      colors: ["#b9eccd", "#defbe9", "#bde4ff", "#d5f5e3"],
    },
    {
      proportion: 0.35,
      softness: 1.0,
      distortion: 0.15,
      swirl: 0.6,
      swirlIterations: 9,
      shape: "checks" as const,
      shapeScale: 0.09,
      colors: ["#ffd3bc", "#ffe6d5", "#ffc6dd", "#fff0e4"],
    },
    {
      proportion: 0.4,
      softness: 0.85,
      distortion: 0.2,
      swirl: 0.8,
      swirlIterations: 12,
      shape: "dots" as const,
      shapeScale: 0.11,
      colors: ["#ffc6dd", "#ffe1ed", "#d9cfff", "#f5e0f0"],
    },
    {
      proportion: 0.32,
      softness: 1.0,
      distortion: 0.14,
      swirl: 0.55,
      swirlIterations: 9,
      shape: "checks" as const,
      shapeScale: 0.08,
      colors: ["#bde4ff", "#def0ff", "#b9eccd", "#d0e8f5"],
    },
    {
      proportion: 0.36,
      softness: 0.95,
      distortion: 0.16,
      swirl: 0.65,
      swirlIterations: 11,
      shape: "dots" as const,
      shapeScale: 0.1,
      colors: ["#ffeda3", "#fff7c7", "#ffd3bc", "#fff5d6"],
    },
    {
      proportion: 0.42,
      softness: 1.15,
      distortion: 0.19,
      swirl: 0.75,
      swirlIterations: 13,
      shape: "checks" as const,
      shapeScale: 0.12,
      colors: ["#ff8a5b", "#ffc6dd", "#ffd3bc", "#ffe0cc"],
    },
    {
      proportion: 0.34,
      softness: 0.9,
      distortion: 0.17,
      swirl: 0.6,
      swirlIterations: 10,
      shape: "dots" as const,
      shapeScale: 0.09,
      colors: ["#d9cfff", "#b9eccd", "#ffeda3", "#ffc6dd"],
    },
    {
      proportion: 0.3,
      softness: 1.0,
      distortion: 0.1,
      swirl: 0.4,
      swirlIterations: 6,
      shape: "checks" as const,
      shapeScale: 0.06,
      colors: ["#f05138", "#ff7a5c", "#ffd3bc", "#ffe6d5"],
    },
    {
      proportion: 0.35,
      softness: 1.1,
      distortion: 0.12,
      swirl: 0.45,
      swirlIterations: 7,
      shape: "dots" as const,
      shapeScale: 0.08,
      colors: ["#ff8a5b", "#ffc8a8", "#ffe6d5", "#fff0e4"],
    },
    {
      proportion: 0.32,
      softness: 0.95,
      distortion: 0.11,
      swirl: 0.5,
      swirlIterations: 8,
      shape: "checks" as const,
      shapeScale: 0.07,
      colors: ["#ffd3bc", "#ffe9d4", "#ff7a5c", "#ffe6d5"],
    },
    {
      proportion: 0.38,
      softness: 1.05,
      distortion: 0.13,
      swirl: 0.42,
      swirlIterations: 7,
      shape: "dots" as const,
      shapeScale: 0.09,
      colors: ["#ffe6d5", "#ffd3bc", "#f05138", "#fff0e4"],
    },
  ]
  return configs[index % configs.length]
}

export function ShaderBackground({ index, className, speed = 0.8 }: { index: number; className?: string; speed?: number }) {
  const shaderConfig = getShaderConfig(index)
  const mobile = useIsMobile()
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className ?? ""}`}>
      {/* Each Warp is a live WebGL context. Six of them run behind panels a
          phone scrolls straight past, and a low-end GPU pays for every one.
          Same palette, painted once as a gradient. */}
      {mobile ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${shaderConfig.colors.join(", ")})` }}
        />
      ) : (
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={shaderConfig.proportion}
          softness={shaderConfig.softness}
          distortion={shaderConfig.distortion}
          swirl={shaderConfig.swirl}
          swirlIterations={shaderConfig.swirlIterations}
          shape={shaderConfig.shape}
          shapeScale={shaderConfig.shapeScale}
          scale={1}
          rotation={0}
          speed={speed}
          colors={shaderConfig.colors}
        />
      )}
    </div>
  )
}

export default function FeaturesCards() {
  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background dark:to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create stunning visual experiences with elegant shader backgrounds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const shaderConfig = getShaderConfig(index)
            return (
              <div key={index} className="relative h-80">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={shaderConfig.proportion}
                    softness={shaderConfig.softness}
                    distortion={shaderConfig.distortion}
                    swirl={shaderConfig.swirl}
                    swirlIterations={shaderConfig.swirlIterations}
                    shape={shaderConfig.shape}
                    shapeScale={shaderConfig.shapeScale}
                    scale={1}
                    rotation={0}
                    speed={0.8}
                    colors={shaderConfig.colors}
                  />
                </div>

                <div className="relative z-10 p-8 rounded-3xl h-full flex flex-col bg-black/80 border border-white/20 dark:border-white/10">
                  <div className="mb-6 filter drop-shadow-lg">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="leading-relaxed flex-grow text-gray-100 font-medium">{feature.description}</p>
                  <div className="mt-6 flex items-center text-sm font-bold text-gray-200">
                    <span className="mr-2">Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
