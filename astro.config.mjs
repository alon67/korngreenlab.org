import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Routes that only exist to redirect old Wix URLs. They are served as noindex
// meta-refresh pages, so they must not also be submitted for indexing.
const redirectRoutes = [
  "/collaborators/",
  "/copy-of-lab-members/",
  "/lab-pictures/",
  "/positions/",
  "/resources/",
  "/themes/",
];

export default defineConfig({
  site: "https://www.korngreenlab.org",
  integrations: [
    sitemap({
      filter: (page) => !redirectRoutes.some((route) => page.endsWith(route)),
    }),
  ],
});
