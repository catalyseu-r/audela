import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'landing-bg': 'linear-gradient(0deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.72) 100%), url("img/BG.png")',
      },
      colors: {
        'text-red': '#CA6677',
        'main-red': '#A64253',
        'main-black': '#090909',
        'main-blue': '#141B41',
        'main-white': '#eaeaea',
      },
      fontSize: {
        'heading-desktop': '2rem',
        'buttons-navigation': '1.25rem',
      },
      fontFamily: {
        title: ['Chakra Petch', 'sans-serif'],
      },
      letterSpacing: {
        'headings-buttons': '-0.0125re;',
      },
    },
  },
  plugins: [],
};
export default config;
