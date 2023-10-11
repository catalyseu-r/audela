import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      backgroundImage: {
        'landing-bg':
          'linear-gradient(to left, rgba(14, 14, 14, .72) 100%, rgba(14, 14, 14, 0.72) 100%), url("img/landing-bg.jpg")',
        'not-found-bg': 'url("img/not-found-n.png")',
      },
      minHeight: {
        'custom-page-min': 'calc(100svh + 1rem)',
        'iframes-images-lg': 'calc(35vh + 2.5rem)',
        'iframes-images-md': 'calc(30vh + 2.5rem)',
        'iframes-images-sm': 'calc(15vh + 2.5rem)',
      },
      colors: {
        'text-red': '#CA6677',
        'main-red': '#A64253',
        'main-black': '#090909',
        'main-blue': '#141B41',
        'main-white': '#F0F0F0',
        'dimmed-white': 'rgba(234, 234, 234, 0.56)',
        'dimmed-white-full': 'rgba(234, 234, 234, 0.08)',
        'dimmed-red': 'rgba(166, 66, 83, 0.24)',
        'dimmed-blue': 'rgba(20, 27, 65, 0.56)',
        'second-black': '#171717',
        'main-orange-accent': '#DB7C26',
        'dimmed-accent': 'rgba(219, 124, 38, 0.56)',
        'disabled-accent': 'rgba(219, 124, 38, 0.24)',
        'transparent-black': 'rgba(9,9,9,.24)',
        'accent-dark': '#904E11',

        //
        'interactive-green': '#66FF66',
        'bg-black': '#0E0E0E',
        'error-red': '#FF3333',
        'accent-pink': '#FF6B6B',
        'text-white': '#E4E4E4',
        'deep-green': '#00A86B',
        'sha-blue': '#6A89CC',
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
        subHeading: '2rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
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
        'custom-img-shadow': '0px 4px 10px 1px rgba(106, 137, 204, 0.80)',
      },
      keyframes: {
        glitch: {},
        elipseTransform: {
          '0%': { transform: 'translate(80px,100px) scale(1.1)' },
          '25%': { transform: 'translate(20px, 150px) scale(1.2)' },
          '50%': { transform: 'translate(40px, 120px) scale(1)' },
          '75%': { transform: 'translate(20px, 100px) scale(1.2)' },
          '100%': { transform: 'translate(-10px, -20px)scale(1.3)' },
        },
      },
      animation: {
        'animate-elipse': 'elipseTransform 15s infinite alternate ease-in-out',
        'animate-elipse-short': 'elipseTransform 10s infinite alternate ease-in-out',
        'animate-reverse': 'elipseTransform 15s infinite alternate-reverse ease-in-out',
      },
      lineHeight: {
        '2xl': '4.5rem',
      },
      dropShadow: {
        'landing-txt': '-4px 4px 16px rgba(102, 255, 102, 0.32)',
      },
      gap: {
        'base-gap': '4.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
