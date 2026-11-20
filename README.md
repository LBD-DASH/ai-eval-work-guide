# AI Eval Work Guide

Static Astro site: a sourced beginner's guide to paid AI training and evaluation work (rating AI answers, writing examples, data labelling). One page per verified platform covering the type of work, stated requirements, and pay only where the platform publishes it, each with source links and a "last checked" date.

Live: https://lbd-dash.github.io/ai-eval-work-guide/

## Develop

```bash
npm ci
npm run dev      # http://localhost:4321/ai-eval-work-guide/
npm run build    # outputs dist/ (fails if any platform file breaks the schema)
```

## Structure

- `src/content/platforms/<slug>.md`: one Markdown file per platform (frontmatter schema in `src/content.config.ts`, validated at build time)
- `src/data/partners.json`: the **only** place outbound platform links that could become referral links live (empty `affiliateUrl` until a program approves)
- `src/data/faq.json`: site FAQ (rendered with FAQPage JSON-LD)
- `src/pages/`: home, platforms index and template, get-started guide, FAQ, about, privacy, affiliate disclosure, `sitemap.xml`, `robots.txt`
- `.github/workflows/deploy.yml`: builds and deploys to GitHub Pages on every push to `main`

## Custom domain later

Set `SITE_URL` (e.g. `https://example.com`) and `BASE_PATH` (`/`) in `.github/workflows/deploy.yml`, add `public/CNAME` with the domain, and configure the domain under Settings, Pages.

## Adding platforms

See [PLAYBOOK.md](./PLAYBOOK.md).
