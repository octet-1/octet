import { ArrowRightIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { faq, faqAside, site } from "@/lib/content"
import { Section } from "./section"

export function Faq() {
  return (
    <Section id="faq" index="06" label="FAQ" title="Questions, answered.">
      <div className="grid divide-y divide-border lg:grid-cols-[1.6fr_1fr] lg:divide-x lg:divide-y-0">
        <div className="bg-background px-4 py-6 sm:px-8">
          <Accordion type="single" collapsible>
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="py-4 text-base hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="flex flex-col gap-6 bg-background px-4 py-8 sm:px-8">
          <pre aria-hidden className="ascii overflow-hidden text-xs text-muted-foreground">
            {"┌─────────────────────────┐\n"}
            {"│ provider api changed    │\n"}
            {"└─────────────────────────┘\n"}
            {"  ↳ "}
            <span className="text-brand">found out from</span>
            {"\n    "}
            <span className="text-brand">a user</span>
            {" "}
            <span className="text-destructive">✗</span>
          </pre>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">{faqAside.title}</h3>
            <p className="text-sm text-pretty text-muted-foreground">{faqAside.description}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <Button size="lg" className="h-10 bg-brand px-4 text-brand-foreground hover:bg-brand/90" asChild>
              <a href={site.contactUrl}>
                {faqAside.primary}
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-4" asChild>
              <a href={site.howItWorksUrl}>{faqAside.secondary}</a>
            </Button>
          </div>
        </aside>
      </div>
    </Section>
  )
}
