export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const siteConfig = {
  name: "ĀROHANA CONSULTANCY",
  tagline: "We build brands, businesses & experiences.",
  description:
    "Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.",
  contact: {
    email: "hello@arohana.co.in",
    phone: "+91 98765 43210",
    locations: ["Kolhapur", "Goa", "Delhi", "Ladakh"],
    address: "Kolhapur, Maharashtra, India"
  },
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com", short: "in" },
    { label: "Instagram", href: "https://instagram.com", short: "ig" },
    { label: "YouTube", href: "https://youtube.com", short: "yt" }
  ],
  navItems: [
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "WORK", href: "/work", badge: "06" },
    { label: "ARMY PROJECTS", href: "/army-projects" },
    { label: "TOURIN", href: "/tourin" },
    { label: "CONTACT", href: "/contact" }
  ]
};
