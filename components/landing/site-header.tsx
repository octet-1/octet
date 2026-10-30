import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nav, site } from "@/lib/content"
import { Container } from "./section"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
      <span aria-hidden className="grid size-6 place-items-center rounded-sm bg-brand text-[10px] text-brand-foreground">
        01
      </span>
      {site.name.toLowerCase()}
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg" asChild>
            <a href={site.githubUrl}>Sign in</a>
          </Button>
          <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90" asChild>
            <a href={site.signUpUrl}>Get started</a>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="rounded-md px-2 py-2 text-sm hover:bg-muted">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <Button variant="outline" size="lg" asChild>
                <a href={site.githubUrl}>Sign in</a>
              </Button>
              <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90" asChild>
                <a href={site.signUpUrl}>Get started</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
