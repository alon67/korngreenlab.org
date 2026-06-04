# Local Review Guide

The site is populated from the verified Wix extraction and has passed manual review for the current migration slice.

## Run Locally

```bash
cd /Users/alon/Documents/MyWebPage
npm run dev -- --host 127.0.0.1
```

Open the local URL printed by Astro. If `4321` is already in use, Astro will choose another port.

## What to Review

- Home: `/`
- Publications: `/publications`
- People / lab members: `/lab-members`
- Legacy Wix people URL: `/copy-of-lab-members` redirects to `/lab-members`
- Gallery: `/gallery`
- Legacy Wix gallery URL: `/lab-pictures` redirects to `/gallery`
- Curriculum Vita: `/curriculum-vita`
- Contact: `/contact`
- Hidden legacy/archive pages still build for URL preservation or audit: `/research`, `/research-hebrew`, `/about1`

## Where to Edit

- Page text and links: `src/content/pages/*.json`
- Rendered page layout: `src/components/ExtractedPage.astro`
- Site header/footer/layout: `src/layouts/BaseLayout.astro`
- Styling: `src/styles/global.css`
- Local image assets used by pages: `src/assets/extracted/`
- Gallery images: `src/assets/gallery/wix-gallery/`
- Wix extraction archive for comparison: `extracted/`

## Checks to Run After Edits

```bash
npm run build
npm run validate:links
npm run validate:extraction
```

## Known Review Items

- Hidden sections are kept only in the extraction archive or direct routes as needed: Research, Hebrew research, Themes, Resources, Collaborators, Positions.
- `/copy-of-lab-members` was the current Wix people source. The local site now renders that content at `/lab-members` and keeps `/copy-of-lab-members` only as a redirect.
- `/lab-pictures` now redirects to the local Gallery page, which renders downloaded images from `src/assets/gallery/wix-gallery/`.
- Publications are sectioned and readable, but still sourced from extracted text rather than BibTeX/CSL-JSON. This is acceptable for manual review, but bibliography structuring remains a future cleanup task before publication.
- Some extracted spelling and naming issues are preserved intentionally, for example roles and old page text. These should be corrected by manual review rather than guessed automatically.
