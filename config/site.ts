export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "CRM System",
  description:
    "A modern CRM system built with Next.js, shadcn/ui, and TailwindCSS.",
  url: "https://your-crm-domain.com",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Leads",
      href: "/leads",
    },
    {
      title: "Companies",
      href: "/companies",
    },
    {
      title: "Contacts",
      href: "/contacts",
    },
    {
      title: "Channels",
      href: "/channels",
    },
  ],
  links: {
    twitter: "https://twitter.com/crmsystem",
    github: "https://github.com/your-org/crm-system",
    docs: "https://docs.your-crm-domain.com",
  },
}
