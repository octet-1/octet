import { CheckIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { example } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Section } from "./section"

export function CodeShowcase() {
  return (
    <Section id="example" index="03" label="Example" title={example.title} subtitle={example.subtitle}>
      <div className="grid divide-y divide-border lg:grid-cols-[1.4fr_1fr] lg:divide-x lg:divide-y-0">
        <div className="min-w-0 bg-background p-4 sm:p-8">
          <Tabs defaultValue={example.snippets[0].id} className="gap-0 overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <TabsList variant="line" className="h-8">
                {example.snippets.map((snippet) => (
                  <TabsTrigger key={snippet.id} value={snippet.id} className="font-mono text-xs">
                    {snippet.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div aria-hidden className="hidden gap-1.5 sm:flex">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
              </div>
            </div>
            {example.snippets.map((snippet) => (
              <TabsContent key={snippet.id} value={snippet.id}>
                {/* Focusable so keyboard users can scroll long lines horizontally */}
                <pre
                  tabIndex={0}
                  aria-label={`${snippet.label} example`}
                  className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <code>
                    {snippet.code.split("\n").map((line, i) => (
                      <span
                        key={i}
                        className={cn("block", line.startsWith("+") && "text-success", line.startsWith("-") && "text-destructive")}
                      >
                        <span className="mr-4 inline-block w-5 text-right text-muted-foreground select-none" aria-hidden>
                          {i + 1}
                        </span>
                        {line}
                      </span>
                    ))}
                  </code>
                </pre>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex min-w-0 flex-col gap-4 bg-background p-4 sm:p-8">
          <div className="overflow-hidden rounded-xl border border-border bg-muted/60">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
              <span>{example.timeline.title}</span>
              <span>{example.timeline.tag}</span>
            </div>
            <div
              tabIndex={0}
              role="log"
              aria-label="Example timeline"
              className="flex flex-col gap-1.5 overflow-x-auto p-4 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              {example.timeline.events.map((line) => (
                <p key={line.time} className="flex gap-3 whitespace-pre">
                  <span className="text-muted-foreground">{line.time}</span>
                  <span className={cn(line.status === "ok" ? "text-success" : "text-muted-foreground")}>
                    {line.status === "ok" ? "✓" : "›"}
                  </span>
                  <span className="text-foreground/90">{line.text}</span>
                </p>
              ))}
              <p className="text-brand">
                <span className="animate-blink">█</span>
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            {example.safeguards.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
