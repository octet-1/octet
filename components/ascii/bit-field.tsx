"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// 7-row bitmap font for the wordmark. Each "#" becomes two characters wide
// so the letters keep a roughly square aspect ratio in a monospace grid.
const GLYPHS: Record<string, string[]> = {
  O: [".#####.", "##...##", "##...##", "##...##", "##...##", "##...##", ".#####."],
  C: [".######", "##.....", "##.....", "##.....", "##.....", "##.....", ".######"],
  T: ["#######", "..###..", "..###..", "..###..", "..###..", "..###..", "..###.."],
  E: ["#######", "##.....", "##.....", "######.", "##.....", "##.....", "#######"],
}

const WORD = "OCTET"
const COLS = 96
const ROWS = 17
const PAD_Y = 5

function buildMask() {
  const glyphRows = GLYPHS.O.length
  const pixels: boolean[][] = Array.from({ length: glyphRows }, () => [])
  WORD.split("").forEach((letter, i) => {
    GLYPHS[letter].forEach((row, y) => {
      if (i > 0) pixels[y].push(false)
      for (const ch of row) pixels[y].push(ch === "#")
    })
  })

  const width = pixels[0].length * 2
  const offsetX = Math.floor((COLS - width) / 2)
  const mask = Array.from({ length: ROWS }, () => new Array<boolean>(COLS).fill(false))
  pixels.forEach((row, y) =>
    row.forEach((on, x) => {
      if (!on) return
      mask[y + PAD_Y][offsetX + x * 2] = true
      mask[y + PAD_Y][offsetX + x * 2 + 1] = true
    }),
  )
  return mask
}

// Distance (in cells) from each cell to the nearest letter pixel, capped.
function buildDistance(mask: boolean[][]) {
  const cap = 12
  return mask.map((row, y) =>
    row.map((_, x) => {
      let best = cap
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -cap; dx <= cap; dx++) {
          if (mask[y + dy]?.[x + dx]) {
            best = Math.min(best, Math.hypot(dx / 2, dy))
          }
        }
      }
      return best
    }),
  )
}

const MASK = buildMask()
const DISTANCE = buildDistance(MASK)

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function cellChar(x: number, y: number, rand: () => number, scan: number) {
  if (MASK[y][x]) return rand() > 0.5 ? "1" : "0"
  const d = DISTANCE[y][x]
  const nearScan = Math.abs(x - scan) < 3
  const density = Math.max(0, 0.55 - d * 0.06) + (nearScan ? 0.25 : 0)
  const r = rand()
  if (r < density * 0.4) return rand() > 0.5 ? "1" : "0"
  if (r < density) return "·"
  return " "
}

function render(rand: () => number, scan: number) {
  const fg: string[] = []
  const bg: string[] = []
  for (let y = 0; y < ROWS; y++) {
    let f = ""
    let b = ""
    for (let x = 0; x < COLS; x++) {
      const ch = cellChar(x, y, rand, scan)
      if (MASK[y][x]) {
        f += ch
        b += " "
      } else {
        f += " "
        b += ch
      }
    }
    fg.push(f)
    bg.push(b)
  }
  return { fg: fg.join("\n"), bg: bg.join("\n") }
}

// Deterministic first frame so server and client markup match.
const INITIAL = render(mulberry32(8), -10)

export function BitField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState(INITIAL)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rand = mulberry32(Date.now())
    let visible = true
    let raf = 0
    let last = 0
    let scan = -10

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(el)

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || t - last < 90) return
      last = t
      scan = scan > COLS + 10 ? -10 : scan + 2
      setFrame(render(rand, scan))
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative w-full select-none overflow-hidden [container-type:inline-size]", className)}
    >
      <div className="relative" style={{ fontSize: `calc(100cqw / ${COLS} / 0.6)` }}>
        <pre className="ascii text-ascii">{frame.bg}</pre>
        <pre className="ascii absolute inset-0 text-brand">{frame.fg}</pre>
      </div>
    </div>
  )
}
