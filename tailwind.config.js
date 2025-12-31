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
        },
        dark: {
          DEFAULT: '#181818', // Main dark background
          50: '#e5e5e5', // Darker off-white text for better visibility
          100: '#d9d9d9', // Darker for better visibility
          200: '#bfbfbf', // Darker for better visibility
          300: '#a6a6a6', // Darker for better visibility
          400: '#999DA3', // Darker light-gray for better text visibility
          500: '#737373', // Darker for better visibility
          600: '#5D666E', // Darker muted hints for better visibility
          700: '#404040', // Darker for better visibility
          800: '#333333',
          900: '#1a1a1a', // Soft black
          card: '#23272a', // Card background
          elevated: '#262626', // Elevated card background
        },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)',
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