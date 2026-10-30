import { ArrowRightIcon } from "lucide-react"
import { BitField } from "@/components/ascii/bit-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { hero, site, stats } from "@/lib/content"
import { CopyCommand } from "./copy-command"
import { Container } from "./section"

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="bg-dots relative">
        <div className="flex flex-col items-center gap-6 px-4 pt-16 pb-10 text-center sm:px-8 md:pt-24">
          <Badge variant="outline" className="h-6 gap-2 bg-card px-3 font-mono text-[11px]" asChild>
            <a href={site.docsUrl}>
              <span className="size-1.5 rounded-full bg-success" />
              {hero.badge}
              <ArrowRightIcon />
            </a>
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl">
            {hero.title[0]}
            <br />
            <span className="text-brand">{hero.title[1]}</span>
          </h1>
          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">{hero.subtitle}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" className="h-10 bg-brand px-4 text-brand-foreground hover:bg-brand/90" asChild>
              <a href={site.signUpUrl}>
                {hero.primaryCta}
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-4" asChild>
              <a href={site.docsUrl}>{hero.secondaryCta}</a>
            </Button>
          </div>
          <CopyCommand command={hero.install} />
        </div>

        <div className="mx-4 mb-10 rounded-xl border border-border bg-card/80 p-3 backdrop-blur-[2px] sm:mx-8 sm:p-6">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>octet://workers/live</span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              streaming
            </span>
          </div>
          <BitField />
        </div>

        <dl className="grid grid-cols-2 border-t border-border bg-background md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1 px-4 py-6 sm:px-8 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-border`}
            >
              <dt className="font-mono text-xs text-muted-foreground uppercase">{stat.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
