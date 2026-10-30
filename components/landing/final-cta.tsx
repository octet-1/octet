import { ArrowRightIcon } from "lucide-react"
import { DitherBg } from "@/components/ascii/dither-bg"
import { Button } from "@/components/ui/button"
import { finalCta, site } from "@/lib/content"
import { Container } from "./section"

export function FinalCta() {
  return (
    <section id="get-started" className="border-b border-border">
      <Container className="relative overflow-hidden">
        <DitherBg />
        <div className="relative flex flex-col items-start gap-6 px-4 py-20 sm:px-8 md:items-center md:py-28 md:text-center">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-5xl">{finalCta.title}</h2>
          <p className="max-w-lg text-pretty text-muted-foreground">{finalCta.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-10 bg-brand px-4 text-brand-foreground hover:bg-brand/90" asChild>
              <a href={site.signUpUrl}>
                {finalCta.primary}
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-10 bg-background px-4" asChild>
              <a href="#">{finalCta.secondary}</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
