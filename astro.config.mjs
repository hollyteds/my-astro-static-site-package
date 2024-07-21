import { defineConfig } from 'astro/config';
import relativeLinks from 'astro-relative-links';
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import htmlBeautifier from "astro-html-beautifier";

// https://astro.build/config
export default defineConfig({
  base: "/",
  outDir: './dist',
  compressHTML: true,
  build: {
    assets: 'assets',
    format: 'directory'
  },
  server: {
    open: true
  },
  placeholder: "none",
  site: 'https://########.jp',
  integrations: [
    tailwind(), sitemap(), htmlBeautifier(),
  ],
  vite: {
    build: {
      sourcemap: false
    }
  }
});