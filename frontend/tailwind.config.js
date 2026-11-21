/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cbz: {
          dark: '#0e1e25',
          navy: '#142833',
          green: '#009270',
          greenHover: '#007a5d',
          accent: '#00b388',
          card: '#1b2f3c',
          lightBg: '#f2f4f7',
          lightCard: '#ffffff',
          border: '#2a4150',
          lightBorder: '#e2e8f0',
          live: '#e53935'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'cbz': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 15px rgba(0, 146, 112, 0.35)',
      }
    },
  },
  plugins: [],
};
