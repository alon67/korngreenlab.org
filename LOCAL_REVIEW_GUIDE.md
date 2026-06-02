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
- Themes: `/themes`
- Resources: `/resources`
- Hebrew research: `/research-hebrew`
- Publications: `/publications`
- Lab members: `/lab-members`
- Current people page from Wix sitemap: `/copy-of-lab-members`
- Curriculum Vita: `/curriculum-vita`
- Collaborators: `/collaborators`
- Positions: `/positions`
- Lab Pictures: `/lab-pictures`
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

- `/lab-pictures` is sparse because the Wix-rendered page exposed only navigation and social links during extraction. If a real gallery is expected, identify whether the source should be the linked Flickr page or another image archive.
- `/lab-members` and `/copy-of-lab-members` both exist in the Wix sitemap. Review which one should be the canonical People page.
- Publications are sectioned and readable, but still sourced from extracted text rather than BibTeX/CSL-JSON. This is acceptable for manual review, but bibliography structuring remains a future cleanup task before publication.
- Some extracted spelling and naming issues are preserved intentionally, for example roles and old page text. These should be corrected by manual review rather than guessed automatically.

