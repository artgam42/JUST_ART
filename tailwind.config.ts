import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#000028',
        accent: '#0000ff',
      },
      fontFamily: {
        display: ['Creato Display', 'sans-serif'],
        signature: ['Waiting for the Bridge', 'cursive'],
      },
    },
    borderRadius: {
      none: '0px',
      DEFAULT: '0px',
      full: '9999px',
    },
  },
  plugins: [],
};

export default config;
