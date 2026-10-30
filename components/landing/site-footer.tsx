import { footer, site } from "@/lib/content"
import { Logo } from "./site-header"
import { Container } from "./section"

export function SiteFooter() {
  return (
    <footer>
      <Container className="overflow-hidden">
        <div className="grid gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" />
              All systems operational
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-4">
            {footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="font-mono text-xs text-muted-foreground uppercase">{column.title}</p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-foreground/80 transition-colors hover:text-brand">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 px-4 pb-6 font-mono text-xs text-muted-foreground sm:flex-row sm:px-8">
          <span>{footer.copyright}</span>
          <span>Made with 0s and 1s.</span>
        </div>
        {/* Oversized wordmark that bleeds off the bottom edge of the page */}
        <div aria-hidden className="px-4 [container-type:inline-size] sm:px-8">
          <p
            className="-mb-[0.2em] bg-linear-to-b from-brand/30 to-brand/0 bg-clip-text text-center leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none"
            style={{ fontSize: "calc(100cqw / 2.32)" }}
          >
            {site.name.toLowerCase()}
          </p>
        </div>
      </Container>
    </footer>
  )
}
