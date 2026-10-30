import { AsciiDiagram } from "@/components/ascii/ascii-diagram"
import { features } from "@/lib/content"
import { Section } from "./section"

export function Features() {
  return (
    <Section
      id="features"
      index="01"
      label="Primitives"
      title="Everything that runs after the request ends."
      subtitle="Six composable building blocks that replace the brokers, cron boxes and glue code you maintain today."
    >
      {/* Every cell draws its right/bottom border; the negative margin tucks the
          outer ones under the clipped edge so only the inner grid lines show */}
      <div className="overflow-hidden">
        <div className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article
              key={feature.title}
              className="flex flex-col gap-6 border-r border-b border-border bg-background p-6 transition-colors hover:bg-muted/40 sm:p-8"
            >
              <div className="flex h-28 items-center overflow-hidden rounded-lg border border-dashed border-border bg-background px-3">
                <AsciiDiagram type={feature.diagram} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
