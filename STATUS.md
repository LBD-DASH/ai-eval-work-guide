# STATUS: AI Eval Work Guide v1

Updated 21 Nov 2026 (SAST).

- **Live URL:** https://lbd-dash.github.io/ai-eval-work-guide/
- **Repo:** https://github.com/LBD-DASH/ai-eval-work-guide (public, `main`, deployed by GitHub Actions to GitHub Pages; Pages enabled with the Actions source)
- **Local dir:** /workspace/ai-income-sites/ai-eval-work-guide/

## Pages shipped (15)

- Home `/`
- Platforms index `/platforms/`
- 7 platform pages (Markdown content collection, schema validated at build time), all checked 20 Nov 2026 against official pages:
  - `/platforms/dataannotation/` (pay ranges from its FAQ)
  - `/platforms/outlier/` (Scale AI; no pay figure published, so none shown)
  - `/platforms/prolific/` (published £6/$8 per hour minimum; notes conflicting country lists in its help centre)
  - `/platforms/alignerr/` (Labelbox; example ranges from its role listings)
  - `/platforms/mercor/` (example rates from its role listings)
  - `/platforms/appen-experts/` ("up to" rates by domain; "never ask you to pay" statement)
  - `/platforms/telus-digital-ai-community/` (requirements from a live listing; no rate published)
- Beginner guide `/get-started/` (includes FTC-cited scams and fees section)
- FAQ `/faq/` (FAQPage JSON-LD; platform pages also carry FAQPage JSON-LD)
- About `/about/`, Privacy `/privacy/`, Affiliate disclosure `/affiliate-disclosure/`, 404
- `/sitemap.xml`, `/robots.txt`

Skipped: **Remotasks** (official site returned 403 to our checks; not verified). "Scale-related programs" are covered via Outlier, which states it is operated by Scale AI.

## Decisions needed (with my recommendation)

1. **Domain.** Stay on lbd-dash.github.io for now, or buy a domain (no spend made). **Recommendation:** stay on github.io until the site has traffic; revisit once 15+ platform pages are live. If yes: add `public/CNAME`, set `SITE_URL`/`BASE_PATH` in the workflow (see README).
2. **Referral/affiliate programs to apply to** (none applied for; all `affiliateUrl` values in `src/data/partners.json` are empty):
   - Outlier: its FAQ says account holders can make referrals from their dashboard, and asks that referrals be people you can personally vouch for. A site-wide referral link may not fit that rule; check Outlier's terms before using one. **Recommendation:** do not use a site-wide Outlier referral link; keep all affiliateUrl empty.
   - Other platforms (DataAnnotation, Prolific, Alignerr, Mercor, Appen Experts, TELUS Digital): we did not find a public affiliate program on the pages we checked. Kevin to decide whether to ask them directly (no outreach made).
   - Ethical note: referral links on a "how to get work" site must stay clearly labelled and must never change which platforms are listed.
3. **Accounts.** Joining any platform yourself (to get referral links or first-hand screenshots) needs your ID and is your call. Analytics (e.g. Plausible, GA) not set up; would need a privacy page update first. **Recommendation:** no account sign-ups for now; if analytics is wanted, use a free cookieless option and update Privacy first.
4. **Next pages:** priority list in PLAYBOOK.md (Remotasks retry, Toloka, Invisible, Turing, Clickworker/UHRS, OneForma; guides on assessments, payouts, platforms open in South Africa).
