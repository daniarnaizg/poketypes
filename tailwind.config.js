/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hunter': "url('/assets/hunter_bg.webp')",
        'porygon': "url('/assets/porygon_bg.webp')",
        'monster': "url('/assets/monster_bg.webp')",
        'muk': "url('/assets/muk_bg.webp')",
        'ghast': "url('/assets/ghast_bg.webp')",
        'pokeball': "url('/assets/pokeball_bg.webp')",
        'poke': "url('/assets/poke_bg.webp')",
      })
    },
  },
  plugins: [],
};
