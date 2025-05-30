import { defineConfig } from 'astro/config';
import relativeLinks from 'astro-relative-links';
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import htmlBeautifier from "astro-html-beautifier";
import codeFormatting from './code.formatting.js';

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
  site: 'https://example.jp',
  integrations: [
    tailwind(),
    sitemap(),
    htmlBeautifier({
      indent_size: 4,
      indent_char: "\t",
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: "keep",
      brace_style: "collapse",
      space_before_conditional: false,
      unescape_strings: false,
      end_with_newline: false,
      wrap_line_length: 0,
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
      unformatted: ["path"],
      content_unformatted: ["path"],
      extra_liners: ["a", "/a", "img", "source", "span", "svg", "button", "/button", "menu-box", "/menu-box", "!--"] 
    }),
    codeFormatting() // htmlBeautifierで整形しきれない分
  ],
  vite: {
    build: {
      sourcemap: false,
      cssCodeSplit: false,
      minify: false,
      keepNames: true
    },
    define: {
      __SITE_NAME__: JSON.stringify('このサイト名'), // サイト名（全てのページで参照できるようにグローバルで定義）
    }
  }
});