import { CheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { pricing, site } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Section } from "./section"

export function Pricing() {
  return (
    <Section id="pricing" index="03" label="Pricing" title={pricing.title} subtitle={pricing.subtitle}>
      <div className="grid gap-4 p-4 sm:p-8 md:grid-cols-3">
        {pricing.plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn("gap-6 rounded-lg", plan.featured && "ring-2 ring-brand shadow-[0_8px_30px_-12px] shadow-brand/30")}
          >
            <CardHeader className="gap-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm uppercase tracking-wider">{plan.name}</CardTitle>
                {plan.featured && (
                  <Badge className="bg-brand-soft font-mono text-[10px] text-brand uppercase">Popular</Badge>
                )}
              </div>
              <p className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </p>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t-0 bg-transparent">
              <Button
                size="lg"
                variant={plan.featured ? "default" : "outline"}
                className={cn("h-10 w-full", plan.featured && "bg-brand text-brand-foreground hover:bg-brand/90")}
                asChild
              >
                <a href={site.signUpUrl}>{plan.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  )
}
