"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); ignore silently.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex h-9 items-center gap-3 rounded-lg border border-border bg-card px-3 font-mono text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
    >
      <span className="text-brand">$</span>
      <span>{command}</span>
      {copied ? <CheckIcon className="size-3.5 text-success" /> : <CopyIcon className="size-3.5" />}
      <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
    </button>
  )
}
