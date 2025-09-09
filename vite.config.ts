import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    react(),
    Inspect(),
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    {
      name: 'async-css-loader',
      transformIndexHtml(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="(.*?)">/,
          `
<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="$1"></noscript>
          `.trim()
        );
      }
    }
  ],
});
