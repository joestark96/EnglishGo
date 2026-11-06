/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58cc02',
          'green-dark': '#46a302',
          'green-light': '#d7ffb8',
          blue: '#1cb0f6',
          'blue-dark': '#1899d6',
          'blue-light': '#ddf4ff',
          orange: '#ff9600',
          'orange-dark': '#e08500',
          'orange-light': '#ffebd4',
          red: '#ff4b4b',
          'red-dark': '#ea2b2b',
          'red-light': '#ffdfe0',
          yellow: '#ffc800',
          'yellow-dark': '#e5b400',
          'yellow-light': '#fff5cc',
          purple: '#ce82ff',
          'purple-dark': '#a855f7',
          gray: {
            100: '#f7f7f7',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717'
          }
        }
      },
      borderRadius: {
        'duo': '16px',
        'duo-lg': '20px',
        'duo-xl': '24px'
      },
      boxShadow: {
        'duo-btn': '0 4px 0 0',
        'duo-btn-sm': '0 2px 0 0',
        'duo-card': '0 4px 0 0 #e5e5e5'
      }
    },
  },
  plugins: [],
}
