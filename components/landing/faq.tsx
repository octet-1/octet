import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faq } from "@/lib/content"
import { Section } from "./section"

export function Faq() {
  return (
    <Section id="faq" index="04" label="FAQ" title="Questions, answered.">
      <div className="px-4 py-6 sm:px-8">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faq.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="py-4 text-base hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
