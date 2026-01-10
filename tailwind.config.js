/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8F3E5', // Mint Green - light background, fresh + calm
          50: '#f9fcf8',
          100: '#f3f9f1',
          200: '#e8f3e5', // Main primary color
          300: '#d1e6c8',
          400: '#b9d9ab',
          500: '#a2cc8e',
          600: '#8bbf71',
          700: '#141713ff',
          800: '#5d9537',
          900: '#46781a',
          DEFAULT: '#6A5ACD', // Muted Purple - Informational (ECISVEEP style)
          50: '#f2f0fc',
          100: '#e6e1f9',
          200: '#d0cbf5',
          300: '#b6b0f0',
          400: '#9b94eb',
          500: '#6A5ACD', // Main muted purple
          600: '#5c4eb5',
          700: '#4e429d',
          800: '#403685',
          900: '#322a6d',
        },
        secondary: {
          DEFAULT: '#D88C9A', // Soft Pink / Rose - Engagement
          50: '#fcf4f5',
          100: '#f9e8eb',
          200: '#f3d1d8',
          300: '#edb9c4',
          400: '#e7a2b1',
          500: '#D88C9A',
          600: '#c27e8a',
          700: '#ac707b',
          800: '#97626c',
          900: '#81545c',
        },
        accent: {
          DEFAULT: '#F2D06B', // Muted Yellow / Warm Cream - Attention
          50: '#fefbf0',
          100: '#fdf7e1',
          200: '#fbecc3',
          300: '#fae1a4',
          400: '#f8d686',
          500: '#F2D06B',
          600: '#dabb60',
          700: '#c2a656',
          800: '#a9924b',
          900: '#917d40',
        },
        dark: {
          DEFAULT: '#181818',
          50: '#e5e5e5',
          100: '#d9d9d9',
          200: '#bfbfbf',
          300: '#a6a6a6',
          400: '#999DA3',
          500: '#737373',
          600: '#5D666E',
          700: '#404040',
          800: '#333333',
          900: '#1a1a1a',
          card: '#23272a',
          elevated: '#262626',
        },
        teal: {
          DEFAULT: '#77B5A9', // Muted Teal - sections, highlights, CTA hover
          50: '#f0f6f5',
          100: '#e1edeb',
          200: '#c3dbd7',
          300: '#a5c9c3',
          400: '#87b7af',
          500: '#77B5A9', // Main teal color
          600: '#6ba398',
          700: '#5f9187',
          800: '#537f76',
          900: '#476d65',
        },
        charcoal: {
          DEFAULT: '#3A3A3A', // Charcoal Gray - text, navbar, footer
          50: '#e9e9e9',
          100: '#d3d3d3',
          200: '#a7a7a7',
          300: '#7b7b7b',
          400: '#4f4f4f',
          500: '#3A3A3A', // Main charcoal color
          600: '#343434',
          700: '#2e2e2e',
          800: '#282828',
          900: '#222222',
        },
        rust: {
          DEFAULT: '#B1492F', // Rust Red-Orange - buttons, accents
          50: '#f7ece9',
          100: '#efd9d3',
          200: '#dfb3a7',
          300: '#cf8d7b',
          400: '#c0674f',
          500: '#B1492F', // Main rust color
          600: '#9f422a',
          700: '#8d3a26',
          800: '#7b3321',
          900: '#692b1c',
        },
        red: {
          DEFAULT: '#C94F4F', // Backpack Red - CTA buttons, highlights
          50: '#f9ecec',
          100: '#f3d9d9',
          200: '#e7b3b3',
          300: '#db8d8d',
          400: '#cf6767',
          500: '#C94F4F', // Main red color
          600: '#b54747',
          700: '#a13f3f',
          800: '#8d3737',
          900: '#792f2f',
        },
        pink: {
          DEFAULT: '#E3B9C5', // Pastel Pink - cards, light backgrounds
          50: '#fbf7f8',
          100: '#f7eff1',
          200: '#efdfe3',
          300: '#e7cfd5',
          400: '#dfbfc7',
          500: '#E3B9C5', // Main pink color
          600: '#cca7b1',
          700: '#b5959d',
          800: '#9e8389',
          900: '#877175',
        },
        blue: {
          DEFAULT: '#AFC9E7', // Pastel Blue - info sections, highlights
          50: '#f6f9fc',
          100: '#edf3f9',
          200: '#dbe7f3',
          300: '#c9dbec',
          400: '#b7cfe6',
          500: '#AFC9E7', // Main blue color
          600: '#9eb5d0',
          700: '#8ca1b9',
          800: '#7a8da2',
          900: '#68798b',
        },
        white: {
          DEFAULT: '#FFFFFF', // White - main background, card base
          500: '#FFFFFF',
        },
        gray: {
          DEFAULT: '#F5F5F5', // Soft Gray - secondary sections, subtle dividers
          50: '#fdfdfd',
          100: '#fbfbfb',
          200: '#f7f7f7',
          300: '#f3f3f3',
          400: '#f0f0f0',
          500: '#F5F5F5', // Main gray color
          600: '#dddddd',
          700: '#c4c4c4',
          800: '#acacac',
          900: '#939393',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'dark-card': '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
        dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dark-dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};