// Every outbound link the page uses. The application, payments and accounts stay
// on the existing bxpsport.com service (memorandum, section 01): this site only
// points at them, it never replaces them.
export const SITE = {
  name: "BXP",
  fullName: "BXP — Best X for Performance",
  url: "https://bxpsport.com",
  apply: "https://bxpsport.com/app/apply",
  account: "https://bxpsport.com/app",
  terms: "https://bxpsport.com/",
  email: "bp@bxpsport.com",
  description:
    "BXP Discover: one week of football in a new environment, on-pitch testing and a staff-reviewed BXP DNA profile. Programs for players, families, clubs and academies.",
} as const;

export const mail = (subject: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
