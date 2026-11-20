# PLAYBOOK: add one platform page

The exact routine for adding **one new platform page**. Follow it top to bottom. If a step can't be completed honestly, ship a smaller page or skip the platform. **Never guess.**

---

## 0. Pick the platform

Take the first unchecked platform in the [priority list](#priority-list). Mark it done in this file in the same commit (`[ ]` to `[x]`). If it fails verification, mark it `[skip]` with a one-line reason and the date.

## 1. Gather sources (official first)

| Need | Where to look (in order) |
|---|---|
| What the platform is, who runs it | The platform's own home page, About page or FAQ |
| Type of work | Official FAQ, "how it works" page, or a live job listing on the platform's own careers site |
| Requirements (location, language, degree, tests, ID) | Official FAQ, help centre, or the specific job listing |
| Pay | Only a figure the platform itself publishes (FAQ, help centre, listing), or a reputable cited source (government, major news outlet). No Reddit, YouTube, Glassdoor-style averages or "up to" marketing averages presented as typical. |
| Fees / scam warnings | The platform's own "we never charge" statement, or the FTC (https://consumer.ftc.gov/articles/job-scams) |

**Fetching tips (on the box):** try `curl -sL -A "<desktop Chrome UA>"` first. If you get 403/404 from a bot wall (e.g. FTC, TELUS), use headless Chrome: `google-chrome --headless=new --no-sandbox --virtual-time-budget=8000 --dump-dom <url>`, then strip tags. Some sites (Alignerr) embed FAQ answers as JSON in the HTML; grep the raw HTML.

## 2. Sourcing rules (non-negotiable)

1. **Never fabricate** a pay figure, requirement, country list, test length or company fact. If it isn't on an official page, leave it out.
2. Every pay figure shows its **source link** and **"last checked" date**. If the platform publishes no figure, set no `pay` field and explain in `payNote` (the page then says "No pay figure published").
3. Listing-based pay (Alignerr, Mercor) is shown only as **examples from the day checked**, never as typical.
4. When official pages **disagree**, say so and link both (see the Prolific country lists).
5. No earnings promises, no "passive income", no "guaranteed income", no testimonials, no em dashes (the long dash character).
6. **Partner links only via `src/data/partners.json`** (each has a plain `url` and an empty `affiliateUrl` until a program approves). Never paste referral links into Markdown. Never invent referral IDs. Links to official pages as sources are fine inline.
7. Dates as "20 Nov 2026". Currency with symbol, ranges with a plain hyphen: `$25-$50/hr`.

## 3. Create the file

Path: `src/content/platforms/<slug>.md` (filename becomes `/platforms/<slug>/`). Add a matching key to `src/data/partners.json`.

### Required frontmatter (validated at build time; the build fails if wrong)

| Field | Rule |
|---|---|
| `name`, `operator` | Name and who runs it, as stated officially |
| `officialUrl` | Official site URL |
| `title` | 20-70 chars, unique. Pattern: `"<Name>: Work Types, Requirements and Pay (<Mon YYYY>)"` |
| `description` | 70-160 chars, unique |
| `lastUpdated` | `YYYY-MM-DD` |
| `lastChecked` | e.g. `"20 Nov 2026"` |
| `summary` | 2 sentences: what it is, and the one thing beginners should know |
| `bestFor` | One line, based only on stated requirements |
| `workTypes`, `requirements` | Lists, each item traceable to a source |
| `pay` | Optional `{ text, sourceUrl }`. Omit if not published. |
| `payNote` | Always: how pay works (method, frequency) or why no figure is shown |
| `partners` | `[<partners.json key>]` |
| `sources` | At least 2 `{ label, url }`. Every URL you used. |
| `faq` | At least 3 `{ q, a }`; answers repeat only facts in the body. Rendered as FAQPage JSON-LD. |
| `order` | Position on the index |

### Body template

```markdown
## What the work looks like
<From [official page](url), checked <date>.>

## Who can apply
<Requirements: location, language, degree, ID. Say when the official pages don't state location rules.>

## Onboarding steps
1. ...

## Published pay   (or "## How pay works" if no figure)
| Track/role | Figure |
|---|---|
Source: [..](url), checked <date>. <Not a promise of hours.>
```

## 4. Check it

```bash
cd /workspace/ai-income-sites/ai-eval-work-guide
npm ci        # first time only
npm run build # must pass; schema errors name the bad field
rg -n "—" --glob '!node_modules' --glob '!dist' --glob '!package-lock.json' .   # must print nothing
rg -n -i "passive income|guaranteed income" src                                     # must print nothing
```

- [ ] Every figure re-checked on its source page today
- [ ] FAQ answers match the body
- [ ] No referral URLs in Markdown
- [ ] Title and description unique
- [ ] `dist/sitemap.xml` includes the new URL

## 5. Publish

Push **only source files** (never `node_modules/` or `dist/`) to `main` of `LBD-DASH/ai-eval-work-guide`. With the GitHub MCP: `push_files` (branch `main`) with the new `.md`, `partners.json` and updated `PLAYBOOK.md`. Commit message: `Add <Name> platform page`. Then check the Actions run and `curl -sI https://lbd-dash.github.io/ai-eval-work-guide/platforms/<slug>/` (expect 200).

## 6. Refresh old pages

Weekly, re-check the oldest `lastChecked` page against its sources, update figures and dates, and push. Listing-based pay changes daily, so refresh those examples first.

---

## Priority list

Done (20 Nov 2026): [x] DataAnnotation · [x] Outlier · [x] Prolific · [x] Alignerr · [x] Mercor · [x] Appen Experts · [x] TELUS Digital AI Community

Skipped: [skip] Remotasks (official site returned 403 to our checks on 20 Nov 2026; retry with headless Chrome and confirm it still accepts new contributors in your region before writing a page)

Next platform pages, in order:

1. [ ] Remotasks (retry verification, see above)
2. [ ] Toloka
3. [ ] Invisible Technologies (AI trainer roles)
4. [ ] Turing (AI trainer / LLM roles)
5. [ ] Clickworker (UHRS)
6. [ ] OneForma (Centific)
7. [ ] Welocalize / LXT rater programs
8. [ ] micro1
9. [ ] Surge AI (check whether it runs its own contributor program)
10. [ ] Labelbox Alignerr Connect (only if it has its own official page)

Next guide pages (same sourcing rules, add as `src/pages/<slug>.astro`):

1. [ ] How AI rating assessments work (and how to prepare honestly)
2. [ ] Getting paid: PayPal, Airtm, Payoneer and Stripe by platform
3. [ ] Platforms open in South Africa (per official country lists only)
4. [ ] Glossary: RLHF, SFT, rubric, side-by-side rating
5. [ ] Taxes for contractors: links to official tax authority pages only
