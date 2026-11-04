import { clients } from "@/lib/content"
import { Container } from "./section"

export function LogoStrip() {
  return (
    <section>
      <Container className="flex flex-col gap-4 border-b border-border py-8 md:flex-row md:items-center">
        <p className="shrink-0 px-4 font-mono text-xs text-muted-foreground uppercase sm:px-8">
          {clients.label}
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-12 pr-12">
            {[...clients.items, ...clients.items].map((client, i) => (
              <span
                key={i}
                aria-hidden={i >= clients.items.length}
                className="font-mono text-lg font-semibold tracking-tight whitespace-nowrap text-muted-foreground"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
