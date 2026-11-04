// All landing copy lives here so it can be swapped without touching layout.

export const site = {
  name: "Octet",
  tagline: "API changes arrive as PRs, not outages",
  description:
    "When an API changes, Octet finds every place your code calls it and opens a pull request with the fix. Nobody reads a changelog, and nothing breaks.",
  howItWorksUrl: "#how-it-works",
  signUpUrl: "#get-started",
  // TODO: replace with the real contact address or form before sharing the page.
  contactUrl: "#get-started",
}

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Octet", href: "#why-octet" },
  { label: "Design partners", href: "#design-partners" },
  { label: "FAQ", href: "#faq" },
]

export const hero = {
  badge: "Building now · Looking for design partners",
  title: ["API changes arrive", "as PRs, not outages."],
  subtitle:
    "When an API changes, Octet finds every place your code calls it and opens a pull request with the fix. Your clients keep working, and nobody has to read a changelog.",
  primaryCta: "Become a design partner",
  secondaryCta: "See how it works",
}

export const clients = {
  label: "Keeps working when an API changes",
  items: [
    "web apps",
    "mobile apps",
    "internal services",
    "partner integrations",
    "third-party APIs",
    "public APIs",
  ],
}

export const problem = {
  title: "An API change shouldn't become an incident.",
  subtitle:
    "Backend tests pass and the change ships. The code that calls the API lives somewhere else, and that's where things break.",
  items: [
    {
      title: "You find out from a user",
      description:
        "A frontend, a mobile app or a partner integration stops working, and the first alert is a customer who can't do their job.",
    },
    {
      title: "Not every client can update at once",
      description:
        "Old app versions stay on phones for weeks, and partners ship on their own schedule. Your API has to keep working for all of them.",
    },
    {
      title: "Changelogs don't update code",
      description:
        "Someone still has to read them, work out what's affected and write the fix. Useful new features go unnoticed.",
    },
  ],
  whyNow: {
    label: "Why now",
    text: "AI lets teams ship changes faster than they can track what breaks, and agents now call APIs too.",
  },
}

export type Step = {
  title: string
  description: string
  diagram: "connect" | "map" | "check" | "fix" | "version" | "adopt"
}

export const howItWorks: { title: string; subtitle: string; steps: Step[] } = {
  title: "From API change to a ready-to-merge fix.",
  subtitle: "This is what we're building: connect your repos once, and Octet checks every change and does the follow-up work for you.",
  steps: [
    {
      title: "Connect your repos",
      description: "Install the GitHub App on your backend and on the repos that call it.",
      diagram: "connect",
    },
    {
      title: "Map every call",
      description:
        "Octet reads the API contract from your code or OpenAPI spec, then finds every place your clients use it.",
      diagram: "map",
    },
    {
      title: "Check each pull request",
      description:
        "Every backend PR is marked as no change, additive or breaking, with a comment listing the clients it affects.",
      diagram: "check",
    },
    {
      title: "Fix the clients",
      description: "For a breaking change, each affected repo gets a PR with the fix before the change ships.",
      diagram: "fix",
    },
    {
      title: "Keep old versions alive",
      description:
        "When a client can't update right away, like an installed mobile app, the previous version stays live until it migrates.",
      diagram: "version",
    },
    {
      title: "Surface new features",
      description: "When an API adds something useful, clients get a PR or a note showing how to use it.",
      diagram: "adopt",
    },
  ],
}

export const example = {
  title: "What your team will see.",
  subtitle: "An example: a backend PR renames one field in a response. Here's how it will work, from the first check to the merge.",
  snippets: [
    {
      id: "check",
      label: "PR comment",
      code: `octet commented on api-server PR #412

Breaking change in GET /v1/invoices
  Response field renamed: due → due_date

Affected clients
  web-app      lib/billing.ts:42
  web-app      hooks/invoice.ts:18
  mobile-app   api/client.ts:97

Already done
  ✓ Fix opened in web-app (PR #88)
  ✓ Fix opened in mobile-app (PR #31)
  ✓ /v1 kept live for older app versions (PR #413)`,
    },
    {
      id: "fix",
      label: "Client fix",
      code: `// web-app/lib/billing.ts  (PR #88)
export function dueLabel(invoice: Invoice) {
-  return formatDate(invoice.due)
+  return formatDate(invoice.due_date)
}`,
    },
    {
      id: "version",
      label: "Old versions",
      code: `// api-server/routes/invoices.ts  (PR #413)
router.get("/v2/invoices", listInvoices)

+// Keeps /v1 live for app versions that haven't updated yet.
+router.get("/v1/invoices", async (req, res) => {
+  const invoices = await getInvoices()
+  res.json(invoices.map(toV1Invoice))
+})`,
    },
  ],
  timeline: {
    title: "PR #412 timeline",
    tag: "example",
    events: [
      { time: "10:02", text: "PR opened in api-server", status: "info" },
      { time: "10:03", text: "Breaking change found", status: "info" },
      { time: "10:09", text: "Fix PRs opened in 2 clients", status: "ok" },
      { time: "10:41", text: "Clients reviewed and merged", status: "ok" },
      { time: "11:15", text: "api-server ships, nothing breaks", status: "ok" },
    ],
  },
  safeguards: [
    "Every fix goes through your own code review and CI",
    "Your tests run in an isolated sandbox before a PR opens",
    "When Octet isn't sure, it flags the PR for a person to check",
  ],
} as const

export const whyOctet = {
  title: "Other tools see one side. Octet sees both.",
  subtitle:
    "Keeping an integration working takes the exact change, the exact usage in each client, and the old version kept live until everyone migrates.",
  modes: [
    {
      title: "When you own the API",
      description:
        "Octet reads the change from your pull request before it ships. Clients get their fix first, and the previous version stays live until they migrate.",
    },
    {
      title: "When you call someone else's API",
      description:
        "Octet reads the provider's changelog and release notes as soon as they're published, finds the calls in your code and opens a PR with the fix.",
    },
    {
      title: "When both sides use Octet",
      description:
        "The provider's exact change reaches the consumer's code before it ships. Every company that joins makes the fixes more accurate for the others.",
    },
  ],
  comparison: {
    columns: ["Octet", "Docs and SDK tools", "Changelog trackers"],
    rows: [
      {
        label: "Knows what changed",
        values: ["Yes, from the PR or the changelog", "Yes, from the spec", "Only what the changelog says"],
      },
      {
        label: "Knows who calls the API",
        values: ["Yes, across connected repos", "No", "Yes, in your code"],
      },
      {
        label: "Fixes the calling code",
        values: ["Yes, a PR in each affected repo", "No", "Some open fix PRs"],
      },
      {
        label: "Keeps the old version live",
        values: ["Yes, when you own the API", "No", "No"],
      },
    ],
  },
}

export const designPartners = {
  title: "Build it with us.",
  subtitle:
    "We're building Octet now, and we're looking for a small group of startups to be the first to run it on real repos. It starts in a mode that opens no PRs until you're ready.",
  cards: [
    {
      name: "Who fits",
      value: "5–50",
      unit: "engineers",
      description: "Seed to Series A software companies.",
      featured: false,
      items: [
        "Backend in TypeScript/Node or Python",
        "Code hosted on GitHub",
        "An API with clients in separate repos",
        "API changes have broken those clients before",
      ],
    },
    {
      name: "What you get",
      value: "Free",
      unit: "during the pilot",
      description: "First access to Octet on your real backend and clients.",
      featured: true,
      cta: "Become a design partner",
      items: [
        "A check on every backend PR",
        "Fix PRs in your client repos",
        "A discount on your first paid plan",
      ],
    },
    {
      name: "What we ask",
      value: "1 hour",
      unit: "to get started",
      description: "A technical decision-maker on your side.",
      featured: false,
      items: [
        "30 minutes of feedback each week",
        "Permission to use you as a reference",
      ],
    },
  ],
}

export const faqAside = {
  title: "Why we're building this",
  description:
    "Our founder spent almost two years as founding engineer and then CPO at a startup that depended on payment, tax and logistics APIs. At least one broke every couple of weeks, and the team always found out from a user who couldn't work. Its own releases also broke a company that used its API.",
  primary: "Talk to the founder",
  secondary: "See how it works",
}

export const faq = [
  {
    q: "Does Octet work with the API I already have?",
    a: "Yes. It works with public, partner-only and internal APIs, including one that only your own frontend and mobile app call. You don't need to host anything with us, and you don't need an OpenAPI spec.",
  },
  {
    q: "Does the API provider need to use Octet too?",
    a: "No. For APIs you don't own, Octet works from the provider's changelog and release notes. If the provider also uses Octet, your fixes come from its exact change and arrive before it ships.",
  },
  {
    q: "Will Octet change my code without review?",
    a: "No. Every fix is a normal pull request that goes through your own review and CI. You decide what gets merged.",
  },
  {
    q: "What if a client can't update right away?",
    a: "For an API you own, Octet opens a PR on your backend that keeps the previous version live. Older mobile app versions and slower clients keep working until they migrate.",
  },
  {
    q: "What does Octet need access to?",
    a: "A GitHub App installed on your backend and client repos. We're starting with startups and don't have SOC 2 yet, so tell us what your team needs and we'll be upfront about it.",
  },
  {
    q: "Which languages and tools do you support?",
    a: "We're building for TypeScript/Node and Python on GitHub first. More languages and code hosts will follow.",
  },
  {
    q: "Can I use Octet today, and what does it cost?",
    a: "Not yet. We're building the product now. Design partners will be the first to use it, for free during the pilot. We plan to charge per API we maintain, and design partners get a discount on their first paid plan.",
  },
  {
    q: "Is this a documentation or changelog tool?",
    a: "No. Documentation tools describe an API, and changelog trackers tell you about changes. Octet updates the code that calls the API.",
  },
]

export const finalCta = {
  title: "Ship API changes without breaking anyone.",
  subtitle: "Tell us about your API and the clients that call it. If it's a fit, you'll be among the first to run Octet on your repos.",
  primary: "Become a design partner",
  secondary: "See how it works",
}

export const footer = {
  status: "Building now",
  columns: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#how-it-works" },
        { label: "Example", href: "#example" },
        { label: "Why Octet", href: "#why-octet" },
      ],
    },
    {
      title: "Get involved",
      links: [
        { label: "Design partners", href: "#design-partners" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: site.contactUrl },
      ],
    },
  ],
  copyright: `© ${2026} Octet`,
}
