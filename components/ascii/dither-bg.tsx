import { cn } from "@/lib/utils"

const RAMP = " ·:░▒"

// Static dither field that fades from the bottom-left corner. Deterministic so
// it renders identically on server and client.
function buildDither(cols: number, rows: number) {
  let seed = 42
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const lines: string[] = []
  for (let y = 0; y < rows; y++) {
    let line = ""
    for (let x = 0; x < cols; x++) {
      const falloff = 1 - Math.hypot(x / cols, (rows - y) / rows) / 1.2
      const v = Math.max(0, falloff + (rand() - 0.5) * 0.35)
      line += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))]
    }
    lines.push(line)
  }
  return lines.join("\n")
}

const DITHER = buildDither(180, 28)

export function DitherBg({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <pre className="ascii absolute bottom-0 left-0 text-[11px] text-ascii/70">{DITHER}</pre>
    </div>
  )
}
