# BXP website

Marketing site for BXP (Best X for Performance): hero, BXP Discover, programs, Welcome Pack, interactive BXP DNA studio, organizations, legal pages. It points to the existing BXP application at `https://bxpsport.com/app`; it never replaces it.

Stack: Next.js (static export), React, TypeScript, Tailwind CSS v4, `motion`. No backend, no database, no environment variables, no secrets.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npx tsc --noEmit # type check
```

## Structure

| Path | Content |
| --- | --- |
| `app/page.tsx` | Page order (sections) |
| `app/layout.tsx` | Metadata, JSON-LD, cookie banner |
| `app/privacy`, `app/legal-notice` | Legal pages (text to complete, see below) |
| `app/not-found.tsx`, `robots.ts`, `sitemap.ts` | 404, robots, sitemap |
| `components/site/` | One file per section (`hero`, `programs`, `dna`, `seal-opening`, ...) |
| `components/ui/` | Reusable effects (tilt card, glowing border, magnetic button, shader) |
| `lib/site.ts` | Every outbound link and the contact email, in one place |
| `public/_headers` | Security headers and cache rules (Netlify) |
| `DEPLOY.md` | Hosting the site in front of the existing app |

## Before going live

- Complete every `[TO COMPLETE]` in `app/legal-notice/page.tsx` and `app/privacy/page.tsx` (company details, host, controller, app privacy policy link). Have them checked by someone qualified.
- Apply the headers of `public/_headers` on the real server (Caddy: see `DEPLOY.md`).
- Cookie banner: `components/site/cookie-banner.tsx`. The site sets no analytics cookie today. A measurement tool, if added, must load only after the `bxp:consent` event reports `"granted"`, and the CSP must be extended for it.
- Keep `/app*`, `/health` and the mail records untouched when replacing the current site.

## Behaviours worth knowing

- The BXP seal plays once as an opening into the "Football knows no borders" section, driven by a scroll lock in `components/site/seal-opening.tsx`. It is skipped with reduced motion.
- The hero film is not loaded with reduced motion or data saving.
- Program example values in the DNA studio are illustrations, not real assessments.
