/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Inter Display', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Android Emoji', 'EmojiSymbols', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      // Additional theme extensions can go here
    },
  },
  plugins: [],
} 