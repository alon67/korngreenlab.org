# Migration Plan: korngreenlab.org from Wix to GitHub

## Feasibility Assessment

The current Wix site is simple enough to port to a static GitHub-hosted site.

The site appears to be a mostly static academic lab website: text pages, external links, profile/contact information, publication lists, research descriptions, Hebrew research content, and a large image gallery. There is no obvious dynamic application logic, authentication, ecommerce, database-backed workflow, or user accounts.

The main migration complexity is content volume, not application complexity:

- The publications page is long and should be converted carefully into structured content.
- The lab pictures page contains many images and captions that need systematic extraction.
- The contact form is Wix-specific and will need replacement.
- Hebrew content needs right-to-left layout support.
- Wix-hosted images may need explicit download from Wix static asset URLs.

Recommended target: a small static site generator project, preferably Astro, with content collections, a real bibliography source file, optimized local image assets, and a static build deployed to GitHub Pages after local editing and approval.

## Observed Site Inventory

Primary pages found during the initial scan:

- Home: `/`
- Research: `/research`
- Themes: `/themes`
- Resources: `/resources`
- Research Hebrew: `/research-hebrew`
- Publications: `/publications`
- Lab Members: `/lab-members`
- Curriculum Vita: `/curriculum-vita`
- Collaborators: `/collaborators`
- Positions: `/positions`
- Lab Pictures: `/lab-pictures`
- Contact: `/contact`

Common site elements:

- Site title: `THE KORNGREEN LAB`
- Subtitle: `Cellular and Computational Neurophysiology`
- Contact email: `alon.korngreen@biu.ac.il`
- Shared navigation with nested Research and People sections
- Social/media icons in the footer

## Proposed Repository Layout

```text
.
├── MIGRATION_PLAN.md
├── README.md
├── package.json
├── package-lock.json
├── .nvmrc
├── astro.config.mjs
├── data/
│   └── site-map.json
├── extracted/
│   ├── raw/
│   ├── content/
│   ├── assets/
│   ├── text-manifest.json
│   ├── image-manifest.json
│   ├── text-verification.md
│   └── image-verification.md
├── public/
│   ├── CNAME
│   ├── favicon.svg
│   └── files/
├── src/
│   ├── assets/
│   │   ├── home/
│   │   ├── research/
│   │   ├── people/
│   │   └── gallery/
│   ├── content/
│   │   ├── pages/
│   │   ├── people/
│   │   ├── publications/
│   │   └── gallery/
│   ├── layouts/
│   ├── pages/
│   └── styles/
└── scripts/
    ├── extract-wix-content.mjs
    ├── download-assets.mjs
    ├── validate-extraction.mjs
    └── validate-links.mjs
```

## Architecture Decisions

- Use Astro for a static site with simple templates and Markdown content.
- Keep content separate from layout so future updates do not require editing page templates.
- Store publications as BibTeX or CSL-JSON, not ad-hoc Markdown, then render them with a citation processor such as `@citation-js/core`.
- Define Astro content collections with schemas for pages, people, gallery records, and publications so malformed edits fail the build clearly.
- Store content and gallery images under `src/assets/` and render them with Astro image optimization. Keep only static passthrough files such as `CNAME`, favicons, PDFs, and downloadable files under `public/`.
- Keep the extraction archive under `extracted/` until the user approves the completed local site, so original Wix-derived text and assets remain available for audit.
- Preserve current URLs where practical, for example `/research`, `/publications`, and `/contact`.
- Set Astro `site` to the final intended custom domain during local scaffolding, so sitemap, canonical URLs, and OpenGraph URLs are correct from the first build.
- Replace the Wix contact form with either an obfuscated email link or a static form provider.
- Pin the Node version in `.nvmrc`, commit `package-lock.json`, and use `npm ci` in GitHub Actions.
- Deploy using GitHub Pages through GitHub Actions only after user local editing and approval.
- Configure the custom domain from the first GitHub Pages deploy so the Astro build can use root-relative paths consistently and avoid a temporary project-page base path.
- Treat the extracted Wix site as source material, not a visual design ceiling. Rebuild the site as a clean static academic site while preserving recognizable design signals from the original Wix site.
- Use the extracted masthead/banner artwork, centered lab identity, refined navigation, and social footer to keep continuity with the old site.
- Use restrained academic typography: centered page width, uppercase section headings, clean spacing, readable publication lists, image bands where appropriate, and responsive gallery layout for mixed image sizes.
- Remove migrated Wix content that the user explicitly retires from the public navigation while preserving audit copies in `extracted/`.
- Use local browser review and user-selected page comments as part of the migration workflow. User text edits, hidden sections, and gallery removals are migration requirements, not postscript cleanup.

## Implementation Instructions Added During Migration

These instructions were added during implementation and should be treated as first-class requirements for this project and any repeat migration:

- The user reviews and edits the local site after extraction and functional construction, before publication.
- Every extracted text and image source is verified locally before relying on it in the rebuilt site.
- The rebuilt site should not blindly reproduce Wix layout clutter. It should transfer useful visual identity while improving readability, spacing, responsive behavior, and content hierarchy.
- Navigation should include only approved live sections. Removed or hidden sections should either redirect, be excluded from navigation, or remain as non-public archive routes as explicitly decided.
- Page-level titles duplicated by navigation should be removed when they add visual noise.
- Gallery images should render from a local project folder and be easy for the user to add to or remove from before publication.
- Generated pages must be tested locally with `npm run build`, link validation, extraction validation, and browser inspection.
- GitHub repository creation and GitHub Pages deployment happen only after explicit user approval of the local site.
- DNS cutover happens only after the GitHub Pages deployment succeeds.
- HTTPS enforcement is enabled only after GitHub approves the domain certificate.
- Wix decommissioning is a separate final stage. Keep Wix DNS, domain registration, and email-related services until their ownership and replacement are verified.

## Phase 1: Capture and Audit Existing Wix Content

### Task 1: Generate a URL Inventory

**Description:** Build a machine-readable list of all known pages and confirm whether Wix exposes a sitemap.

**Acceptance criteria:**

- [ ] `data/site-map.json` contains every page to migrate.
- [ ] Each page has title, URL path, language, and priority.
- [ ] Unknown or hidden pages are documented.
- [ ] `https://www.korngreenlab.org/sitemap.xml` is checked directly for Wix-generated URLs.
- [ ] Registrar/DNS ownership and access for `korngreenlab.org` are confirmed early.
- [ ] GitHub Pages custom-domain target is documented, including apex and `www` handling.

**Verification:**

- [ ] Compare collected URLs against the live navigation.
- [ ] Check for sitemap/robots availability.
- [ ] Confirm who can edit DNS records before any deployment task begins.

**Dependencies:** None

**Estimated scope:** Small

### Task 2: Extract Text Content

**Description:** Use Playwright browser automation to render each Wix page, scroll it fully, and save cleaned content locally. Browser automation is required because Wix content and lazy-loaded sections may not appear in plain `curl`/`fetch` HTML.

**Acceptance criteria:**

- [ ] Raw HTML snapshots are saved under `extracted/raw/`.
- [ ] Clean Markdown drafts are saved under `extracted/content/`.
- [ ] Structured text metadata is saved under `extracted/text-manifest.json`.
- [ ] Page headings, paragraphs, lists, and external links are preserved.
- [ ] Each extracted page records source URL, extraction timestamp, title, heading count, paragraph count, link count, and character count.
- [ ] Each page is scrolled to the bottom before extraction so client-rendered and lazy-loaded content is captured.
- [ ] A full static mirror is saved as a backup archive before cutover if practical.

**Verification:**

- [ ] Manually compare each extracted Markdown file against the live Wix page.
- [ ] Pay special attention to publications and Hebrew content.
- [ ] Confirm that every URL in `data/site-map.json` has matching raw HTML and cleaned Markdown files.

**Dependencies:** Task 1

**Estimated scope:** Medium

### Task 3: Extract Image and File Assets

**Description:** Download all Wix-hosted images and any downloadable files into a local asset directory, preferring original-resolution Wix media over transformed thumbnails.

**Acceptance criteria:**

- [ ] All page-level images are saved under `extracted/assets/`.
- [ ] Gallery images are saved with stable filenames.
- [ ] Captions and alt text are captured in `extracted/gallery.json`.
- [ ] Image source URL, local filename, byte size, dimensions, page reference, caption, and alt text are captured in `extracted/image-manifest.json`.
- [ ] Broken or inaccessible assets are listed in `extracted/asset-errors.json`.
- [ ] Wix `static.wixstatic.com/media/...` image transform URLs are normalized to original media URLs where possible before download.

**Verification:**

- [ ] Count extracted gallery records against the live gallery.
- [ ] Open a random sample of downloaded images.
- [ ] Confirm every image referenced by extracted content exists locally.
- [ ] Confirm no downloaded image is zero bytes or unreadable.

**Dependencies:** Task 1

**Estimated scope:** Medium

### Task 4: Verify Text Extraction Completeness

**Description:** Audit the extracted text before any site construction begins, ensuring that all visible Wix text has a local source copy.

**Acceptance criteria:**

- [ ] `extracted/text-verification.md` records the verification status for every page.
- [ ] All page titles and primary headings match the live Wix pages.
- [ ] Important body text is present, including research descriptions, publications, positions, collaborators, CV content, contact details, and Hebrew content.
- [ ] Publications are checked section-by-section and publication counts are recorded.
- [ ] Any missing, duplicated, malformed, or uncertain text is listed with source URL and proposed fix.

**Verification:**

- [ ] Run a text verification script that compares sitemap entries against `extracted/text-manifest.json`.
- [ ] Manually review all high-value pages: home, research, publications, lab members, lab pictures, contact, and Hebrew research.
- [ ] Do not start Phase 2 until all critical text issues are resolved or explicitly accepted by the user.

**Dependencies:** Task 2

**Estimated scope:** Medium

### Task 5: Verify Image and Asset Extraction Completeness

**Description:** Audit image and file extraction before any site construction begins, ensuring that all visible Wix media has a local source copy.

**Acceptance criteria:**

- [ ] `extracted/image-verification.md` records the verification status for every page with images.
- [ ] Every image visible on the live Wix site is represented in `extracted/image-manifest.json`.
- [ ] Every local image file has a valid byte size, readable dimensions, and a stable filename.
- [ ] Gallery image count, captions, and local filenames are verified against the live lab pictures page.
- [ ] Missing, duplicate, corrupted, or low-resolution images are listed in `extracted/asset-errors.json`.

**Verification:**

- [ ] Run an image verification script that checks local file existence, byte size, dimensions, and manifest references.
- [ ] Manually open a representative sample from each page and a larger sample from the gallery.
- [ ] Do not start Phase 2 until all critical image issues are resolved or explicitly accepted by the user.

**Dependencies:** Task 3

**Estimated scope:** Medium

## Phase 2: Build a Local Testable Static Site

### Task 6: Scaffold the Astro Project

**Description:** Create the local project structure, install dependencies, and add basic scripts.

**Acceptance criteria:**

- [ ] `npm install` completes.
- [ ] `npm run dev` starts a local preview.
- [ ] `npm run build` creates a static `dist/` directory.
- [ ] Astro `site` is set to the final intended custom domain before sitemap, canonical, or OpenGraph metadata is generated.
- [ ] The scaffold includes `@astrojs/sitemap` and the planned image/citation tooling.

**Verification:**

- [ ] Open the local site in a browser.
- [ ] Confirm no console errors on the home page.

**Dependencies:** None

**Estimated scope:** Small

### Task 7: Implement Shared Layout and Navigation

**Description:** Recreate the lab site structure with a responsive header, navigation, footer, and base typography.

**Acceptance criteria:**

- [ ] Header includes the lab name and subtitle.
- [ ] Header uses the extracted masthead/banner artwork where it improves continuity with the old site.
- [ ] Lab identity is centered and visually prominent without using a marketing-style hero.
- [ ] Navigation includes only approved public sections.
- [ ] Retired Wix sections are hidden from navigation or redirected according to user approval.
- [ ] Footer preserves approved contact and social-media affordances.
- [ ] Layout works on desktop and mobile.
- [ ] Hebrew page supports `dir="rtl"`.
- [ ] Mixed Hebrew/English content uses `dir="auto"` on inline text or `unicode-bidi: isolate` where needed so English names, DOIs, and punctuation render correctly.
- [ ] Page-level duplicate titles below the navigation are removed unless the page needs a unique heading for clarity.

**Verification:**

- [ ] Browser check at desktop and mobile viewport sizes.
- [ ] Keyboard navigation works through the menu.
- [ ] Check that no visible text or navigation items wrap awkwardly or overlap on narrow viewports.

**Dependencies:** Task 6

**Estimated scope:** Medium

### Task 8: Convert Core Pages

**Description:** Convert home, research, themes, resources, positions, collaborators, CV, and contact into Astro pages backed by Markdown content.

**Acceptance criteria:**

- [ ] Each page renders at the same path as the Wix site.
- [ ] Internal links work.
- [ ] External links open correctly.
- [ ] Contact page has a working email link.
- [ ] User-approved copy changes are applied after extraction rather than overwritten by automated regeneration.
- [ ] User-retired content sections are removed from live pages even if they exist in the extracted archive.
- [ ] Images are placed intentionally, not merely dumped in extraction order.
- [ ] The home page presents the approved current research description.

**Verification:**

- [ ] Compare rendered local pages against the live Wix pages.
- [ ] Run link validation.
- [ ] User reviews each major page in the local browser and marks required repairs before GitHub publication.

**Dependencies:** Tasks 4, 6, 7

**Estimated scope:** Medium

### Task 9: Convert Publications

**Description:** Convert the long publications page into BibTeX or CSL-JSON as the single source of truth, then render it into the site with a citation processor.

**Acceptance criteria:**

- [ ] Edited books, journal articles, book chapters, correspondence, and commentaries are preserved.
- [ ] Publication records are stored in `src/content/publications/` or `src/content/publications.bib` / `publications.json`.
- [ ] Publication numbering, sorting, and section counts are generated from records rather than manually maintained paragraphs.
- [ ] DOI, publisher, journal, year, author, title, and URL fields are preserved where available.
- [ ] Publication pages include citation metadata suitable for indexing where practical.
- [ ] Newer user-supplied publications and book chapters are merged after extraction and numbering remains correct.
- [ ] Non-publication extracted link blocks are removed when the user retires them.

**Verification:**

- [ ] Compare publication record counts and section headings against the live Wix page.
- [ ] Validate BibTeX or CSL-JSON syntax.
- [ ] Run a local visual check for readability.

**Dependencies:** Tasks 4, 6, 7

**Estimated scope:** Medium

### Task 10: Convert People and Gallery Pages

**Description:** Build reusable components for lab members and gallery images.

**Acceptance criteria:**

- [ ] Current and former lab members render from structured content.
- [ ] Gallery renders from the committed `src/content/gallery/` collection.
- [ ] `extracted/gallery.json` remains an audit/extraction copy only and is not the site's runtime content source.
- [ ] Images use local files from `src/assets/` and meaningful alt text.
- [ ] Gallery page remains performant despite many images.
- [ ] Astro emits optimized responsive image variants for gallery and content images.
- [ ] People-page images are removed if the user decides the page should be text-only.
- [ ] Outdated people sources are not used when a current replacement page exists.
- [ ] User-supplied gallery folders are supported so additional images can be added without re-crawling Wix.
- [ ] Individual gallery images can be excluded without deleting the source file.
- [ ] Mixed image sizes and orientations render in a balanced responsive gallery.

**Verification:**

- [ ] Compare people list and gallery captions against Wix.
- [ ] Check lazy-loading and image sizing in browser.
- [ ] Confirm the gallery updates after adding images to the local gallery folder.

**Dependencies:** Tasks 5, 6, 7

**Estimated scope:** Medium

### Task 11: Add Site Polish and Indexing Metadata

**Description:** Add the small production details that are easy to miss but important for a public academic site.

**Acceptance criteria:**

- [ ] `sitemap.xml` is generated with `@astrojs/sitemap`, and `robots.txt` is generated or provided.
- [ ] A useful `404` page exists.
- [ ] Favicon and basic site metadata are configured.
- [ ] OpenGraph metadata exists for major pages.
- [ ] Publication pages include academic citation metadata where practical.
- [ ] Astro's generated `_astro/` assets are present in `dist/`.
- [ ] `robots.txt` references the final custom-domain sitemap.
- [ ] No `.nojekyll` workaround is required when deploying through GitHub Actions artifacts.

**Verification:**

- [ ] Check generated `dist/` contains sitemap, robots, 404, favicon, and optimized assets.
- [ ] Inspect metadata on the home, research, publications, and contact pages.

**Dependencies:** Tasks 6-10

**Estimated scope:** Small

## Phase 3: User Editing and Local Acceptance

### Task 12: Hand Off Local Site for User Editing

**Description:** After extraction and functional construction, pause publishing work and let the user edit the local repository content directly.

**Acceptance criteria:**

- [ ] The local site is fully editable from files in `/Users/alon/Documents/MyWebPage`.
- [ ] `README.md` explains how to run, edit, preview, and test the local site.
- [ ] Content files are organized so the user can edit text, people, publications, and gallery metadata without touching layout code for normal content changes.
- [ ] The handoff documentation is tool-agnostic and does not depend on a specific agent.
- [ ] No GitHub repository is created and no GitHub Pages deployment is configured before user approval.
- [ ] A local browser review checklist records approved pages and pending repairs.
- [ ] User browser comments and requested removals are applied before publication.

**Verification:**

- [ ] User runs the local site with `npm run dev`.
- [ ] User edits representative content and confirms the local preview updates correctly.
- [ ] User runs `npm run build` or runs the build through whatever tooling they use after edits.
- [ ] User explicitly approves publication to GitHub.

**Dependencies:** Tasks 6-11

**Estimated scope:** Small

## Phase 4: Git, GitHub, and Deployment

### Task 13: Prepare Local Git Repository

**Description:** Use the existing local Git repository in `/Users/alon/Documents/MyWebPage` and add normal project hygiene.

**Acceptance criteria:**

- [ ] `.gitignore` excludes `node_modules/`, `dist/`, and temporary extraction artifacts as appropriate.
- [ ] `README.md` documents local development commands.
- [ ] Initial migration commit is created after user edits and local testing are complete.
- [ ] `.nvmrc` and `package-lock.json` are committed.
- [ ] `src/content/` and `src/assets/` contain all content required to build the site.
- [ ] `extracted/` is either committed as an audit archive or archived outside Git; because the site renders from committed content collections, this choice does not affect the build.

**Verification:**

- [ ] `git status` is clean after commit.
- [ ] `npm run build` passes before committing.

**Dependencies:** Task 12

**Estimated scope:** Small

### Task 14: Create GitHub Repository

**Description:** Create a GitHub repository and push the local project only after the user approves the locally tested version.

**Acceptance criteria:**

- [x] GitHub remote is configured as `origin`.
- [x] Default branch is pushed.
- [x] Repository visibility is selected intentionally: public for GitHub Pages simplicity, private only if Pages support is confirmed for the account plan.
- [x] The pushed version matches the user-approved local build.

**Suggested commands:**

```bash
gh repo create korngreenlab.org --public --source=. --remote=origin --push
```

**Verification:**

- [x] GitHub repository opens in the browser.
- [x] Remote branch matches local branch.

**Dependencies:** Task 13

**Estimated scope:** Small

### Task 15: Configure GitHub Pages and Custom Domain

**Description:** Add a GitHub Actions workflow that builds Astro and deploys `dist/` to GitHub Pages using the intended custom domain from the first deployment.

**Acceptance criteria:**

- [x] `.github/workflows/deploy.yml` builds on pushes to the default branch.
- [x] GitHub Pages source is set to GitHub Actions.
- [x] Workflow uses the pinned Node version and `npm ci`.
- [x] `public/CNAME` contains the intended custom domain before the first Pages deployment.
- [x] Astro `site` is confirmed to match the final custom domain configured earlier in Task 6.
- [x] The build avoids a temporary project-page `base` path unless the user intentionally defers custom-domain setup.
- [x] The deployed site loads successfully at the GitHub Pages URL.
- [x] GitHub Pages HTTPS enforcement is enabled after certificate provisioning.

**Verification:**

- [x] GitHub Actions deployment succeeds.
- [x] Deployed pages match local build output.
- [x] Internal links and image paths work at the custom domain root.

**Dependencies:** Task 14

**Estimated scope:** Small

### Task 16: Optional DNS Cutover from Wix

**Description:** Point `korngreenlab.org` or `www.korngreenlab.org` from Wix to GitHub Pages after review and successful custom-domain deployment.

**Acceptance criteria:**

- [x] Apex domain uses GitHub Pages A records; optional AAAA records are documented but not required.
- [x] `www` uses a CNAME to the GitHub Pages host if both domains should work.
- [x] HTTPS certificate is active in GitHub Pages.
- [x] Wix site remains untouched until the GitHub site is approved.

**Verification:**

- [x] `https://www.korngreenlab.org/` resolves to GitHub Pages after DNS propagation.
- [x] Key old URLs still work.

**Dependencies:** Task 15

**Estimated scope:** Small, but DNS propagation may take hours.

### Task 17: Decommission Wix Safely

**Description:** Decommission the old Wix website only after the GitHub site is live, DNS resolves to GitHub Pages, and HTTPS is enforced.

**Acceptance criteria:**

- [ ] Wix remains available as DNS manager if the domain still uses Wix name servers.
- [ ] Domain registration, MX records, mailbox subscriptions, and app subscriptions are identified before canceling anything.
- [ ] The old Wix site is unpublished before deleting or canceling the site plan.
- [ ] Wix website plan cancellation is separated from domain and email cancellation.
- [ ] The old mobile Wix CNAME such as `m.korngreenlab.org` is removed only if confirmed unused.

**Verification:**

- [ ] `https://www.korngreenlab.org/` still opens the GitHub Pages site after Wix unpublishing.
- [ ] Email still works after any Wix plan changes.
- [ ] DNS records remain under an active DNS manager.

**Dependencies:** Task 16

**Estimated scope:** Small, but depends on Wix account billing and domain ownership details.

## Checkpoints

### Checkpoint A: After Phase 1

- [ ] All page content exists locally.
- [ ] All needed image assets are downloaded or listed as missing.
- [ ] `extracted/text-manifest.json` and `extracted/image-manifest.json` exist.
- [ ] Text verification report confirms all critical text has been captured.
- [ ] Image verification report confirms all critical images have been captured and are readable.
- [ ] Any accepted extraction gaps are documented with user approval.
- [ ] Migration risks are updated based on extraction results.

### Checkpoint B: After Phase 2

- [ ] Local site runs with `npm run dev`.
- [ ] Static build passes with `npm run build`.
- [ ] Browser review passes for desktop and mobile.
- [ ] Sitemap, robots, 404, favicon, metadata, and optimized images are present.
- [ ] Site is ready for user editing, but is not published.

### Checkpoint C: After Phase 3

- [ ] User has edited the local repository content.
- [ ] User has tested the local site.
- [ ] Build passes after user edits.
- [ ] User explicitly approves publishing to GitHub.

### Checkpoint D: After Phase 4

- [x] GitHub repository exists and has a clean default branch.
- [x] GitHub Pages deployment succeeds.
- [x] Custom domain is either configured or explicitly deferred.
- [x] HTTPS is enforced after certificate provisioning.

### Checkpoint E: After Wix Decommissioning

- [ ] Old Wix site is unpublished or canceled according to the user's billing decision.
- [ ] DNS remains active and points to GitHub Pages.
- [ ] Domain registration and email services are confirmed active.
- [ ] The GitHub repository is the source of truth for future website edits.

## Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Wix image URLs are transformed or protected | Missing gallery/images | Use browser automation to collect final rendered image URLs; keep an asset error log |
| Contact form cannot be statically hosted | Lost contact submissions | Start with `mailto:`; optionally add Formspree, Basin, Netlify Forms, or Google Forms |
| Publications extraction loses formatting | Academic content errors | Convert into BibTeX or CSL-JSON and manually verify counts/sections |
| Hebrew text renders incorrectly | Poor reader experience | Add `lang="he"` and `dir="rtl"` for Hebrew pages |
| GitHub Pages base path changes when moving to a custom domain | Broken image and internal links | Configure `CNAME` and final custom-domain `site` from the first deployment |
| DNS cutover breaks existing site | Downtime | Confirm registrar access in Phase 1; deploy and review GitHub Pages first; change DNS only after approval |
| Hidden Wix pages are missed | Incomplete migration | Check sitemap.xml, navigation, search results, and live page links |
| Node dependencies rot over time | Future build failures | Pin Node, commit lockfile, use `npm ci`, and keep content schemas strict |
| Rebuilt site keeps Wix visual clutter | Poor readability | Transfer only useful design signals and perform local browser review with user-requested repairs |
| Wix cancellation disrupts domain or email | Site or email outage | Decommission Wix website plan separately from DNS, domain registration, and email services |

## Recommended First Implementation Session

1. Create `data/site-map.json` from the observed URL inventory.
2. Confirm sitemap, registrar, and DNS access.
3. Write Playwright-based extraction scripts to save raw HTML, cleaned Markdown, manifests, and original-resolution assets.
4. Run extraction for all known pages.
5. Review extracted content, image manifests, and asset errors.
6. Resolve or explicitly accept extraction gaps before scaffolding Astro.
7. After the local site works, pause for user edits and local acceptance before any GitHub publishing.

## Definition of Done

- All approved public Wix pages are represented in the GitHub project, and retired pages are documented or redirected.
- All required images and files are local to the repository or intentionally linked externally.
- Publications are stored as BibTeX or CSL-JSON and render correctly.
- The site builds locally and deploys through GitHub Pages.
- The user edits and tests the local site before it is pushed to GitHub or deployed.
- The deployed GitHub Pages site is reviewed before DNS is changed.
- The migration can be repeated from scripts if the Wix site content changes before final cutover.
- The final live domain resolves to GitHub Pages with HTTPS enforced.
- Wix website decommissioning is either complete or explicitly deferred with domain, DNS, and email ownership documented.
