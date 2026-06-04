# Korngreen Lab Website Migration

This repository is the local migration workspace for moving `https://www.korngreenlab.org/` from Wix to a static GitHub-hosted site.

## Local Commands

```bash
npm install
npm run extract
npm run validate:extraction
npm run dev
npm run build
```

The local preview usually runs at `http://localhost:4321/`.

## Workflow

1. Extract all Wix text and assets into `extracted/`.
2. Verify text and image extraction before building pages.
3. Build the local Astro site from committed content under `src/content/` and `src/assets/`.
4. Let the user edit and test locally.
5. Publish to GitHub Pages only after explicit user approval.

## Manual Review

See [LOCAL_REVIEW_GUIDE.md](LOCAL_REVIEW_GUIDE.md) for the local review checklist, editing locations, and known review items.

## Reusable Migration Plan

See [GENERIC_WIX_TO_GITHUB_MIGRATION_PLAN.md](GENERIC_WIX_TO_GITHUB_MIGRATION_PLAN.md) for a site-agnostic Wix-to-GitHub Pages migration plan that can be reused for other Wix sites.

## Deployment

The local site has passed user inspection and has been pushed to GitHub:

- Repository: `https://github.com/alon67/korngreenlab.org`
- Pages source: GitHub Actions
- GitHub Pages custom-domain URL: `http://www.korngreenlab.org/` (DNS may still point to Wix until cutover)
- Temporary GitHub Pages URL: `https://alon67.github.io/korngreenlab.org/`
- Custom domain configured in GitHub Pages: `www.korngreenlab.org`

GitHub Pages HTTPS enforcement is still pending certificate provisioning. DNS cutover from Wix should happen only after reviewing the deployed GitHub Pages site and confirming the DNS records are ready.

## Content Sources

- `extracted/` is the local audit archive from Wix.
- `src/content/` is the source used by the Astro site.
- `src/assets/` stores optimized site images.
- `public/` stores passthrough files such as `CNAME`, favicons, and downloads.

The current People page content comes from the Wix `/copy-of-lab-members` extraction and is rendered locally at `/lab-members`. The old `/copy-of-lab-members` route redirects to `/lab-members`.

The extracted archive still contains Themes, Resources, Collaborators, Positions, and Lab Pictures, but those sections are no longer active site pages.
