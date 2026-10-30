import { AsciiField } from "@/components/ascii/ascii-field"
import { hero, nav, site } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-hero text-hero-foreground">
      <AsciiField word={site.name.toLowerCase()} className="absolute inset-0 -z-20 text-hero-ink" />
      {/* Keeps the copy readable over the busiest part of the field */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-tr from-hero via-hero/75 to-hero/10" />

      {/* Same max width and gutters as the sections below */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <header className="flex items-center justify-between px-4 py-5 font-mono text-xs uppercase tracking-[0.2em] sm:px-8">
          <span className="font-semibold">{site.name}</span>
          <nav aria-label="Main" className="hidden gap-6 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-sm opacity-90 underline-offset-4 transition-opacity outline-none hover:underline hover:opacity-100 focus-visible:ring-2 focus-visible:ring-hero-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span aria-hidden className="size-2.5 bg-hero-foreground" />
        </header>

        <div className="mt-auto flex items-end justify-between gap-8 px-4 pb-12 sm:px-8 md:pb-16">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em]">{hero.badge}</p>
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              {hero.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.signUpUrl}
                className="inline-flex h-10 items-center rounded-lg bg-hero-foreground px-4 text-sm font-medium text-hero transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-hero-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
              >
                {hero.primaryCta}
              </a>
              <a
                href={site.docsUrl}
                className="inline-flex h-10 items-center rounded-lg border border-hero-foreground/70 px-4 text-sm font-medium transition-colors outline-none hover:bg-hero-foreground/10 focus-visible:ring-2 focus-visible:ring-hero-foreground"
              >
                {hero.secondaryCta}
              </a>
              <code className="font-mono text-xs opacity-90">$ {hero.install}</code>
            </div>
          </div>
          <span aria-hidden className="hidden font-mono text-xs md:block">
            Oc<span className="animate-blink">_</span>
          </span>
        </div>
      </div>
    </section>
  )
}
