import { whyOctet } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Section } from "./section"

export function WhyOctet() {
  const { columns, rows } = whyOctet.comparison

  return (
    <Section id="why-octet" index="04" label="Why Octet" title={whyOctet.title} subtitle={whyOctet.subtitle}>
      <div className="grid divide-y divide-border border-b border-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {whyOctet.modes.map((mode) => (
          <article key={mode.title} className="flex flex-col gap-2 bg-background p-6 sm:p-8">
            <h3 className="font-medium">{mode.title}</h3>
            <p className="text-sm text-pretty text-muted-foreground">{mode.description}</p>
          </article>
        ))}
      </div>
      {/* Focusable so keyboard users can scroll the table on narrow screens */}
      <div
        tabIndex={0}
        role="region"
        aria-label="How Octet compares with other tools"
        className="overflow-x-auto bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <table className="w-full min-w-2xl text-left text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-xs text-muted-foreground uppercase">
              <td className="px-6 py-4 sm:px-8" />
              {columns.map((column, i) => (
                <th key={column} scope="col" className={cn("px-4 py-4 font-medium", i === 0 && "text-brand")}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <th scope="row" className="px-6 py-4 font-medium sm:px-8">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={columns[i]}
                    className={cn("px-4 py-4 text-muted-foreground", i === 0 && "bg-brand-soft/60 text-foreground")}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
