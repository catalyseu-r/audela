import type { Config } from 'tailwindcss';

//linear-gradient(0deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.72) 100%),

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': 'url("img/BG.png")',
      },
      colors: {
        'text-red': '#CA6677',
        'main-red': '#A64253',
        'main-black': '#090909',
        'main-blue': '#141B41',
        'main-white': '#F0F0F0',
        'dimmed-white': 'rgba(234, 234, 234, 0.56)',
        'dimmed-red': 'rgba(166, 66, 83, 0.24)',
        'dimmed-blue': 'rgba(20, 27, 65, 0.56)',
        'second-black': '#171717',
        'main-orange-accent': '#DB7C26',
        'dimmed-accent': 'rgba(219, 124, 38, 0.56)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1280px',
        xl: '1820px',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontFamily: {
        title: ['Chakra Petch', 'sans-serif'],
      },
      letterSpacing: {
        'headings-buttons': '-0.0125rem;',
      },
      maxWidth: {
        'container-lg': '1120px',
      },
      boxShadow: {
        'custom-article-shadow': '-8px 8px 0px 0px rgba(23, 23, 23, 0.24)',
      },
    },
  },
  plugins: [],
};
export default config;
