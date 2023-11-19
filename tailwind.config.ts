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
        'iframes-images-lg': 'calc(40vh + 2.5rem)',
        'iframes-images-md': 'calc(35vh + 2.5rem)',
        'iframes-images-sm': 'calc(30vh + 2.5rem)',
      },
      colors: {
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
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
        },

        customPing: {
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: '.07',
          },
        },

        bioTextAnima: {
          '0%': {
            transform: 'translateX(4em) rotate3d(0, 1, 0, 180deg)',
            opacity: '0',
          },

          '100%': {
            transform: 'translateX(0) rotate3d(0, 1, 0, 0deg)',
            opacity: '1',
          },
        },

        landingTextAnima: {
          '0%': {
            transform: 'translateY(-50%) translateX(24%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1',
          },
        },

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
          '0%': { transform: 'translate(55%, 5%) scale(1.4)', opacity: '.8' },
          '25%': { transform: 'translate(45%, -10%) scale(1) ', opacity: '.7' },
          '50%': { transform: 'translate(-55%, 20%) scale(.9) ', opacity: '.5' },
          '75%': { transform: 'translate(-45%, 10%) scale(1.5) ', opacity: '.9' },
          '100%': { transform: 'translate(100%, 30%) scale(1) ', opacity: '1' },
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

        tooltipFadeIn: {
          '0%': {
            transform: 'translateY(-50%) translateX(-25%)',
          },
          '100%': {
            transform: 'translateY(-100%) translateX(-25%)',
          },
        },

        filterSettingsFadeIn: {
          '0%': {
            transform: 'translateY(-8%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },

        roverPickScreenAnima: {
          '0%': {
            transform: 'translateY(16%) translateX(-24%)',
            opacity: '.25',
          },
          '100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1',
          },
        },

        roverGalleryScreenAnima: {
          '0%': {
            transform: 'translateY(-16%) translateX(24%)',
            opacity: '.25',
          },

          '100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1',
          },
        },

        socialStackAnima: {
          '0%': { transform: 'translateY(-200%) translateX(-24%)' },
          '100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        enter: 'baseFadeIn 1s ease',
        leave: 'baseFadeOut 1s ease-in ',
        'animate-elipse': 'elipseTransform 35s infinite alternate ease-in-out',
        'animate-elipse-short': 'elipseTransform 25s infinite alternate ease-in-out',
        'animate-reverse': 'elipseTransform 35s infinite alternate-reverse ease-in-out',
        'animate-heart': 'heartTransform .5s ease-in-out .25s',
        'animate-hand': 'handTransform .5s ease-in-out',
        'waving-hand': 'wave 3s linear infinite',
        'animate-ping-custom': 'customPing 1s cubic-bezier(0, 0, 0.2, 1) infinite ',
        'animate-text-custom': 'bioTextAnima .5s cubic-bezier(.31,.05,0,1.03) forwards ',
        'animate-tooltip': 'tooltipFadeIn 1s cubic-bezier(.31,.05,0,1.03) forwards',
        'animate-filters': 'filterSettingsFadeIn 1s cubic-bezier(.31,.05,0,1.03) forwards',
        'animate-rover-pick': 'roverPickScreenAnima 1s ease',
        'animate-rover-gallery': 'roverGalleryScreenAnima 1s ease',
        'animate-social-stack': 'socialStackAnima 1s ease forwards',
        'animate-landing-text': 'landingTextAnima 1.5s cubic-bezier(.31,.05,0,1.03) forwards',
      },
      transitionTimingFunction: {
        'custom-anim': 'cubic-bezier(.31,.05,0,1.03)',
        'overshoot-bezier-custom': 'cubic-bezier(.95,-0.38,.47,.55)',
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
