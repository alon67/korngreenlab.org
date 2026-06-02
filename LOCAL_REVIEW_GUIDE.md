# Local Review Guide

The site is populated from the verified Wix extraction and is ready for manual review and repair.

## Run Locally

```bash
cd /Users/alon/Documents/MyWebPage
npm run dev -- --host 127.0.0.1
```

Open the local URL printed by Astro. If `4321` is already in use, Astro will choose another port.

## What to Review

- Home: `/`
- Research: `/research`
- Hebrew research: `/research-hebrew`
- Publications: `/publications`
- People / lab members: `/lab-members`
- Legacy Wix people URL: `/copy-of-lab-members` redirects to `/lab-members`
- Curriculum Vita: `/curriculum-vita`
- Contact: `/contact`
- Sitemap-only page: `/about1`

## Where to Edit

- Page text and links: `src/content/pages/*.json`
- Rendered page layout: `src/components/ExtractedPage.astro`
- Site header/footer/layout: `src/layouts/BaseLayout.astro`
- Styling: `src/styles/global.css`
- Local image assets used by pages: `src/assets/extracted/`
- Wix extraction archive for comparison: `extracted/`

## Checks to Run After Edits

```bash
npm run build
npm run validate:links
npm run validate:extraction
```

## Known Review Items

- Removed sections are kept only in the extraction archive: Themes, Resources, Collaborators, Positions, and Lab Pictures.
- `/copy-of-lab-members` was the current Wix people source. The local site now renders that content at `/lab-members` and keeps `/copy-of-lab-members` only as a redirect.
- Publications are sectioned and readable, but still sourced from extracted text rather than BibTeX/CSL-JSON. This is acceptable for manual review, but bibliography structuring remains a future cleanup task before publication.
- Some extracted spelling and naming issues are preserved intentionally, for example roles and old page text. These should be corrected by manual review rather than guessed automatically.
