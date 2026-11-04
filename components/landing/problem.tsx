import { problem } from "@/lib/content"
import { Section } from "./section"

export function Problem() {
  return (
    <Section id="problem" index="01" label="The problem" title={problem.title} subtitle={problem.subtitle}>
      <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {problem.items.map((item) => (
          <article key={item.title} className="flex flex-col gap-2 bg-background p-6 sm:p-8">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-pretty text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </div>
      <p className="flex flex-col gap-1 border-t border-border bg-background px-6 py-5 text-sm sm:flex-row sm:gap-3 sm:px-8">
        <span className="font-mono text-xs leading-5 text-brand uppercase">{problem.whyNow.label}</span>
        <span className="text-pretty text-muted-foreground">{problem.whyNow.text}</span>
      </p>
    </Section>
  )
}
