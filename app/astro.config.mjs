// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yuzuki.xcw.me/',
  integrations: [vue(), sitemap()],
  server: {
    port: 8001,
  },
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "yue"],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      yue: "ja",
    },
  },
});
