import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { designPartners, site } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Section } from "./section"

export function DesignPartners() {
  return (
    <Section
      id="design-partners"
      index="05"
      label="Design partners"
      title={designPartners.title}
      subtitle={designPartners.subtitle}
    >
      <div className="grid gap-4 p-4 sm:p-8 md:grid-cols-3">
        {designPartners.cards.map((card) => (
          <Card
            key={card.name}
            className={cn("gap-6 rounded-lg", card.featured && "ring-2 ring-brand shadow-[0_8px_30px_-12px] shadow-brand/30")}
          >
            <CardHeader className="gap-2">
              <CardTitle className="font-mono text-sm uppercase tracking-wider">{card.name}</CardTitle>
              <p className="flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">{card.value}</span>
                <span className="text-sm text-muted-foreground">{card.unit}</span>
              </p>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="flex flex-col gap-2.5">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            {card.cta && (
              <CardFooter className="border-t-0 bg-transparent">
                <Button size="lg" className="h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90" asChild>
                  <a href={site.signUpUrl}>{card.cta}</a>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </Section>
  )
}
