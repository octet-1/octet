// All landing copy lives here so it can be swapped without touching layout.
// Product positioning is a placeholder until the final messaging is ready.

export const site = {
  name: "Octet",
  tagline: "Infrastructure primitives for developers",
  description:
    "Octet gives you queues, cron, webhooks and durable workflows behind one typed SDK. Ship background work in minutes, not sprints.",
  docsUrl: "#docs",
  signUpUrl: "#get-started",
  githubUrl: "https://github.com/Kerpooo/octet",
}

export const nav = [
  { label: "Product", href: "#features" },
  { label: "Developers", href: "#code" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "#docs" },
]

export const hero = {
  badge: "Now in public beta",
  title: ["Background work,", "byte-sized."],
  subtitle:
    "Queues, schedules, webhooks and durable workflows as simple primitives. Write a function, deploy it, and let Octet handle retries, scaling and observability.",
  primaryCta: "Start building",
  secondaryCta: "Read the docs",
  install: "pnpm add @octet/sdk",
}

export const logos = [
  "acme.io",
  "northwind",
  "hyperloop",
  "parallax",
  "vertex/labs",
  "quanta",
  "lumen",
  "orbital",
]

export type Feature = {
  title: string
  description: string
  diagram: "queue" | "cron" | "webhook" | "workflow" | "edge" | "logs"
}

export const features: Feature[] = [
  {
    title: "Queues that never drop a job",
    description:
      "At-least-once delivery, automatic retries with backoff and dead-letter handling out of the box.",
    diagram: "queue",
  },
  {
    title: "Cron without servers",
    description:
      "Declare schedules next to your code. Octet runs them on time, every time, in any timezone.",
    diagram: "cron",
  },
  {
    title: "Webhooks, verified",
    description:
      "Receive, verify and replay webhooks from any provider. Never lose an event to a cold start again.",
    diagram: "webhook",
  },
  {
    title: "Durable workflows",
    description:
      "Chain steps that survive crashes and deploys. Sleep for days, resume exactly where you left off.",
    diagram: "workflow",
  },
  {
    title: "Runs at the edge",
    description:
      "Workers in 30+ regions pick up jobs close to your data, with predictable cold-start-free latency.",
    diagram: "edge",
  },
  {
    title: "Observability built in",
    description:
      "Structured logs, traces and per-step timings for every run. Search, filter and replay from one place.",
    diagram: "logs",
  },
]

export const code = {
  title: "A few lines. Zero infrastructure.",
  subtitle:
    "Define a job with the SDK, trigger it from anywhere and watch it run. Same API in every language.",
  snippets: [
    {
      id: "ts",
      label: "TypeScript",
      code: `import { octet } from "@octet/sdk"

export const sendWelcome = octet.job("send-welcome", {
  retries: 5,
  run: async ({ userId }, step) => {
    const user = await step.run("load-user", () => getUser(userId))
    await step.sleep("wait-a-bit", "10m")
    await step.run("send-email", () => sendEmail(user))
  },
})

await sendWelcome.trigger({ userId: "usr_8f2a" })`,
    },
    {
      id: "py",
      label: "Python",
      code: `from octet import Octet

octet = Octet()

@octet.job("send-welcome", retries=5)
async def send_welcome(ctx, user_id: str):
    user = await ctx.step("load-user", lambda: get_user(user_id))
    await ctx.sleep("wait-a-bit", "10m")
    await ctx.step("send-email", lambda: send_email(user))

await send_welcome.trigger(user_id="usr_8f2a")`,
    },
    {
      id: "curl",
      label: "cURL",
      code: `curl https://api.octet.dev/v1/jobs/send-welcome/trigger \\
  -H "Authorization: Bearer $OCTET_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "userId": "usr_8f2a" }'`,
    },
  ],
  terminal: [
    { time: "12:04:01.112", text: "run_01J9X  send-welcome  queued", status: "info" },
    { time: "12:04:01.140", text: "step load-user           32ms", status: "ok" },
    { time: "12:04:01.141", text: "step wait-a-bit          sleeping 10m", status: "info" },
    { time: "12:14:01.208", text: "step send-email          118ms", status: "ok" },
    { time: "12:14:01.209", text: "run_01J9X  completed     3 steps", status: "ok" },
  ] as const,
}

export const stats = [
  { value: "2.1B", label: "jobs processed" },
  { value: "99.99%", label: "uptime SLA" },
  { value: "<40ms", label: "p50 dispatch" },
  { value: "30+", label: "edge regions" },
]

export const pricing = {
  title: "Pricing that scales one byte at a time",
  subtitle: "Start free. Pay only for the runs you use. No seats, no surprises.",
  plans: [
    {
      name: "Hobby",
      price: "$0",
      period: "/month",
      description: "For side projects and prototypes.",
      cta: "Start for free",
      featured: false,
      features: [
        "50k runs / month",
        "3 concurrent workers",
        "7-day log retention",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For teams shipping to production.",
      cta: "Start 14-day trial",
      featured: true,
      features: [
        "2M runs / month included",
        "100 concurrent workers",
        "30-day log retention",
        "Replays & alerting",
        "Email support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For scale, compliance and control.",
      cta: "Talk to us",
      featured: false,
      features: [
        "Unlimited runs",
        "Dedicated regions & VPC",
        "SSO, SAML & audit logs",
        "99.99% uptime SLA",
        "Shared Slack channel",
      ],
    },
  ],
}

export const faq = [
  {
    q: "How is Octet different from running my own queue?",
    a: "You skip provisioning brokers, workers and dashboards. Octet handles delivery guarantees, retries, scaling and observability so you only write the job logic.",
  },
  {
    q: "Which languages and frameworks are supported?",
    a: "Official SDKs for TypeScript and Python, plus a REST API for everything else. Works with Next.js, Remix, Express, FastAPI, Django and more.",
  },
  {
    q: "What happens if a job fails?",
    a: "Failed steps are retried with exponential backoff. Completed steps are memoized, so retries resume from the failing step instead of starting over.",
  },
  {
    q: "Can I self-host Octet?",
    a: "Enterprise customers can run Octet in their own cloud account. Reach out and we will help you plan the deployment.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes. The Hobby plan includes 50k runs per month forever, no credit card required.",
  },
]

export const finalCta = {
  title: "Ship your first job in five minutes.",
  subtitle: "Install the SDK, define a function and deploy. We take it from there.",
  primary: "Get started free",
  secondary: "Book a demo",
}

export const footer = {
  columns: [
    { title: "Product", links: ["Queues", "Cron", "Webhooks", "Workflows", "Changelog"] },
    { title: "Developers", links: ["Docs", "API reference", "SDKs", "Status", "GitHub"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
  ],
  copyright: `© ${2026} Octet Labs, Inc.`,
}
