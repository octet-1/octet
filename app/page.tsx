import { Hero } from "@/components/hero"
import { CodeShowcase } from "@/components/landing/code-showcase"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { FinalCta } from "@/components/landing/final-cta"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Pricing } from "@/components/landing/pricing"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <LogoStrip />
        <Features />
        <CodeShowcase />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
