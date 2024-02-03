import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  safelist: [
    {
      pattern: /col-span-\d+/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /hidden/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
        },
        cpurple: {
          DEFAULT: 'hsl(var(--purple))',
        },
        cpink: {
          DEFAULT: 'hsl(var(--pink))',
        },
        cblue: {
          DEFAULT: 'hsl(var(--blue))',
        },
        cgreen: {
          DEFAULT: 'hsl(var(--green))',
        },
        cyellow: {
          DEFAULT: 'hsl(var(--yellow))',
        },
        corange: {
          DEFAULT: 'hsl(var(--orange))',
        },
        cred: {
          DEFAULT: 'hsl(var(--red))',
        },
      },
    },
  },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
