import { Hero } from "@/components/hero"
import { CodeShowcase } from "@/components/landing/code-showcase"
import { DesignPartners } from "@/components/landing/design-partners"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { FinalCta } from "@/components/landing/final-cta"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Problem } from "@/components/landing/problem"
import { SiteFooter } from "@/components/landing/site-footer"
import { WhyOctet } from "@/components/landing/why-octet"

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <LogoStrip />
        <Problem />
        <Features />
        <CodeShowcase />
        <WhyOctet />
        <DesignPartners />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
