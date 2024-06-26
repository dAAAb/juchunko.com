/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,jsx,ts,tsx,md,mdx}', './components/**/*.{js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        noise: "url('/image/noise.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/container-queries')],
}
