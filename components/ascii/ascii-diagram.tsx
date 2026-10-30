import type { Feature } from "@/lib/content"
import { cn } from "@/lib/utils"

// Small hand-drawn diagrams. "*" marks characters rendered in the brand color.
const DIAGRAMS: Record<Feature["diagram"], string> = {
  queue: `
 producer   queue         worker
 ┌──────┐  ┌────────┐   ┌───────┐
 │ push │─▶│*██████*░░│──▶│ *✓* ack │
 └──────┘  └────────┘   └───┬───┘
               ▲  retry x3  │
               └────────────┘
`,
  cron: `
 every weekday at *09:00* UTC
 ┌────────────────────────────┐
 │ mo  tu  we  th  fr  sa  su │
 │ *●*   *●*   *●*   *●*   *●*   ·   ·  │
 └────────────────────────────┘
 next run ──▶ *in 14h 22m*
`,
  webhook: `
 stripe ─┐
 github ─┼──▶ [ *verify* ] ──▶ handler
 slack  ─┘        │
          replay ◀┘   sig *✓*
`,
  workflow: `
 ┌──────┐   ┌──────┐   ┌──────┐
 │ s1 *✓* │──▶│ s2 *✓* │──▶│ s3 *…* │
 └──────┘   └──────┘   └──────┘
   sleep("3d") ··· resume *▶*
`,
  edge: `
    ·  *◉* iad    ·    *◉* fra   ·
  ·    ·    *◉* gru   ·   *◉* sin
    *◉* sfo  ·    ·   *◉* nrt   ·
    p50 *38ms*   regions *32*
`,
  logs: `
 12:04:01 *✓* load-user    32ms
 12:04:01 · wait-a-bit   10m
 12:14:01 *✓* send-email  118ms
 ▁▂▃▅▇▅▃▂▁▂▃▅*▇█▇*▅▃▂  trace
`,
}

function renderLine(line: string, key: number) {
  const parts = line.split("*")
  return (
    <span key={key}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-brand">
            {part}
          </span>
        ) : (
          part
        ),
      )}
      {"\n"}
    </span>
  )
}

export function AsciiDiagram({ type, className }: { type: Feature["diagram"]; className?: string }) {
  const lines = DIAGRAMS[type].replace(/^\n|\n$/g, "").split("\n")
  return (
    <pre aria-hidden className={cn("ascii overflow-hidden text-[11px] text-muted-foreground", className)}>
      {lines.map(renderLine)}
    </pre>
  )
}
