import { cn } from "@/lib/utils"

// Page container with the vertical "rails" shared by every section.
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl border-x border-border", className)}>{children}</div>
  )
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
      <span className="text-brand">[{index}]</span> {children}
    </p>
  )
}

export function Section({
  id,
  index,
  label,
  title,
  subtitle,
  className,
  children,
}: {
  id?: string
  index: string
  label: string
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-border">
      <Container className={className}>
        <div className="flex flex-col gap-4 border-b border-border px-4 py-12 sm:px-8 md:py-16">
          <SectionLabel index={index}>{label}</SectionLabel>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
          {subtitle && <p className="max-w-xl text-pretty text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}
