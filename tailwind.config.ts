import type { Config } from 'tailwindcss';

//linear-gradient(0deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.72) 100%),

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },

    extend: {
      backgroundImage: {
        'landing-bg': 'url("img/BG.png")',
      },
      colors: {
        'text-red': '#CA6677',
        'main-red': '#A64253',
        'main-black': '#090909',
        'main-blue': '#141B41',
        'main-white': '#eaeaea',
        'dimmed-white': 'rgba(234, 234, 234, 0.56)',
        'dimmed-red': 'rgba(166, 66, 83, 0.24)',
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
      spacing: {
        xlscreen: '22rem',
        mdscreen: '9rem',
        smscreen: '1rem',
      },
    },
  },
  plugins: [],
};
export default config;