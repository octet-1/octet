import type { Step } from "@/lib/content"
import { cn } from "@/lib/utils"

// Small hand-drawn diagrams. "*" marks characters rendered in the brand color.
const DIAGRAMS: Record<Step["diagram"], string> = {
  connect: `
 github app
 ┌─────────┐   ┌─ api-server  *✓*
 │ install │──▶├─ web-app     *✓*
 └─────────┘   └─ mobile-app  *✓*
`,
  map: `
 GET /v1/invoices
  ├─ web-app/lib/billing.ts:42
  ├─ web-app/hooks/invoice.ts:18
  └─ mobile-app/api/client.ts:97
 *3 calls found*
`,
  check: `
 PR #412  due → due_date

 none · additive · *[breaking]*

 affects *3 calls* in 2 repos
`,
  fix: `
 web-app  PR #88
 - invoice.due
 + *invoice.due_date*

 tests *✓*   ready for review
`,
  version: `
 app v2.3 ──▶ /v1  *live*
 app v2.4 ──▶ /v2  *live*

 /v1 stays up until
 clients migrate
`,
  adopt: `
 + GET /v1/invoices/export  *new*

 web-app    ──▶ PR: *use it*
 mobile-app ──▶ note: *how to*
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

export function AsciiDiagram({ type, className }: { type: Step["diagram"]; className?: string }) {
  const lines = DIAGRAMS[type].replace(/^\n|\n$/g, "").split("\n")
  return (
    <pre aria-hidden className={cn("ascii overflow-hidden text-[11px] text-muted-foreground", className)}>
      {lines.map(renderLine)}
    </pre>
  )
}
