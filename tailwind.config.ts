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
        'overlay-landing': 'url(img/overlay-landing.png)',
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
        'custom-img-shadow': '0px 4px 10px 1px rgba(106, 137, 204, 0.80)',
        'custom-image-strong-shadow': '12px 12px 4px -4px #00A86B',
        'custom-article-shadow': '0px 4px 10px 1px rgba(106, 137, 204, 0.80)',
      },
      keyframes: {
        glitch: {},

        baseFadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(50%)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        baseFadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0', transform: 'translateX(-50%)' },
        },

        elipseTransform: {
          '0%': { transform: 'translate(80px,100px) scale(1.1)' },
          '25%': { transform: 'translate(20px, 150px) scale(1.2)' },
          '50%': { transform: 'translate(40px, 120px) scale(1)' },
          '75%': { transform: 'translate(20px, 100px) scale(1.2)' },
          '100%': { transform: 'translate(-10px, -20px)scale(1.3)' },
        },
        heartTransform: {
          '0%, 100%': {
            transform: 'translateY(0) scale(0)',
            color: 'initial',
          },
          '50%': { transform: 'translateY(-50%) scale(1.5)', color: '#66FF66', fill: '#66FF66' },
        },

        handTransform: {
          '0%, 100%': {
            transform: 'skewY(0)',
          },

          '50%': {
            transform: 'skewY(-12deg)',
          },
        },
      },
      animation: {
        enter: 'baseFadeIn 1s ease',
        leave: 'baseFadeOut 1s ease-in ',
        'animate-elipse': 'elipseTransform 15s infinite alternate ease-in-out',
        'animate-elipse-short': 'elipseTransform 10s infinite alternate ease-in-out',
        'animate-reverse': 'elipseTransform 15s infinite alternate-reverse ease-in-out',
        'animate-heart': 'heartTransform .5s ease-in-out .25s',
        'animate-hand': 'handTransform .5s ease-in-out',
      },
      transitionTimingFunction: {
        'custom-anim': 'cubic-bezier(.31,.05,0,1.03)',
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
