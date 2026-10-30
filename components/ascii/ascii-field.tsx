"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Characters from sparse to dense. Index 0 is never drawn (background shows through).
const RAMP = " .:-=+*x#%@"
const CELL_W = 5
const CELL_H = 8
const FONT_SIZE = 8
const FRAME_MS = 33

// Metaballs drifting on Lissajous paths. Coordinates are in "height units":
// y spans 0..1 and x spans 0..aspect.
const BLOBS = [
  { r: 0.3, sx: 0.11, sy: 0.07, px: 0.0, py: 1.3 },
  { r: 0.24, sx: 0.08, sy: 0.13, px: 2.1, py: 0.4 },
  { r: 0.16, sx: 0.15, sy: 0.09, px: 4.0, py: 2.7 },
  { r: 0.12, sx: 0.06, sy: 0.17, px: 1.2, py: 5.1 },
  { r: 0.27, sx: 0.13, sy: 0.05, px: 3.3, py: 3.9 },
  { r: 0.1, sx: 0.19, sy: 0.11, px: 5.6, py: 0.9 },
  { r: 0.2, sx: 0.05, sy: 0.08, px: 0.7, py: 4.4 },
]

function hash(x: number, y: number) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function noise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

// Turns the field value into a 0..1 ink intensity: a bright rim around each
// shape, a speckled body, and a hollow "nucleus" where blobs overlap strongly.
function intensity(f: number, n: number) {
  if (f < 1) return Math.exp(-((f - 1) ** 2) / 0.012) * 0.95 - (1 - n) * 0.15
  if (f < 2.6) return 0.42 + n * 0.55
  return Math.exp(-((f - 2.6) ** 2) / 0.06) * 0.9
}

function buildAtlas(ink: string, dpr: number) {
  const atlas = document.createElement("canvas")
  atlas.width = CELL_W * RAMP.length * dpr
  atlas.height = CELL_H * dpr
  const ctx = atlas.getContext("2d")!
  ctx.scale(dpr, dpr)
  ctx.fillStyle = ink
  ctx.font = `${FONT_SIZE}px ${getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "monospace"}, ui-monospace, monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  for (let i = 1; i < RAMP.length; i++) {
    ctx.fillText(RAMP[i], i * CELL_W + CELL_W / 2, CELL_H / 2 + 0.5)
  }
  return atlas
}

// Rasterizes the background word at grid resolution so each cell can sample it.
function buildWordMask(word: string, cols: number, rows: number) {
  const c = document.createElement("canvas")
  c.width = cols
  c.height = rows
  const ctx = c.getContext("2d")!
  // Cells are taller than wide, so squash horizontally to keep letter proportions.
  ctx.scale(CELL_H / CELL_W, 1)
  ctx.font = `${Math.round(rows * 0.62)}px Georgia, "Times New Roman", serif`
  ctx.textBaseline = "alphabetic"
  ctx.fillStyle = "#000"
  ctx.fillText(word, cols * 0.02, rows * 0.92)
  const data = ctx.getImageData(0, 0, cols, rows).data
  const mask = new Uint8Array(cols * rows)
  for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] > 128 ? 1 : 0
  return mask
}

export function AsciiField({ word, className }: { word?: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let cols = 0
    let rows = 0
    let dpr = 1
    let atlas: HTMLCanvasElement | null = null
    let mask: Uint8Array | null = null
    let visible = true
    let raf = 0
    let last = 0

    const pointer = { x: -10, y: -10, tx: -10, ty: -10, r: 0, tr: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cols = Math.ceil(rect.width / CELL_W)
      rows = Math.ceil(rect.height / CELL_H)
      canvas.width = cols * CELL_W * dpr
      canvas.height = rows * CELL_H * dpr
      atlas = buildAtlas(getComputedStyle(canvas).color, dpr)
      mask = word ? buildWordMask(word, cols, rows) : null
      draw(reduceMotion ? 18 : performance.now() / 1000)
    }

    const draw = (t: number) => {
      if (!atlas || !cols) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const aspect = (cols * CELL_W) / (rows * CELL_H)
      const blobs = BLOBS.map((b) => ({
        x: aspect * (0.5 + 0.48 * Math.sin(t * b.sx + b.px)),
        y: 0.5 + 0.48 * Math.sin(t * b.sy + b.py),
        r2: b.r * b.r,
      }))
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08
      pointer.r += (pointer.tr - pointer.r) * 0.05
      if (pointer.r > 0.005) blobs.push({ x: pointer.x, y: pointer.y, r2: pointer.r * pointer.r })

      const grain = Math.floor(t * 10)
      const cw = CELL_W * dpr
      const ch = CELL_H * dpr

      for (let y = 0; y < rows; y++) {
        const ny = (y + 0.5) / rows
        for (let x = 0; x < cols; x++) {
          const nx = ((x + 0.5) * CELL_W) / (rows * CELL_H)

          let f = 0
          for (const b of blobs) {
            const dx = nx - b.x
            const dy = ny - b.y
            f += b.r2 / (dx * dx + dy * dy + 1e-4)
          }
          const n =
            noise(nx * 7 + t * 0.25, ny * 7 - t * 0.18) * 0.65 +
            noise(nx * 22 - t * 0.4, ny * 22) * 0.35
          f *= 0.8 + n * 0.4

          let v = intensity(f, n) + (hash(x + grain * 131, y) - 0.5) * 0.3
          let alpha = 1
          if (v < 0.32) {
            if (!mask?.[y * cols + x] || hash(x, y + grain) > 0.55) continue
            v = 0.4 + n * 0.3
            alpha = 0.22
          }

          const idx = Math.min(RAMP.length - 1, Math.max(1, Math.round(v * (RAMP.length - 1))))
          ctx.globalAlpha = alpha
          ctx.drawImage(atlas, idx * cw, 0, cw, ch, x * cw, y * ch, cw, ch)
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden || now - last < FRAME_MS) return
      last = now
      draw(now / 1000)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      pointer.tx = (e.clientX - rect.left) / rect.height
      pointer.ty = (e.clientY - rect.top) / rect.height
      pointer.tr = inside ? 0.11 : 0
      if (pointer.r < 0.005) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    intersectionObserver.observe(canvas)

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [word])

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />
}
