/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'm-xsm': ['0.64rem', '0.75rem'], // m for mobile
      'm-sm': ['0.8rem', '1rem'],
      'm-p': ['1rem', '1.25rem'],
      'm-h6': ['1.25rem', '1.5rem'], 
      'm-h5': ['1.563rem', '1.75rem'],
      'm-h4': ['1.953rem', '2.25rem'],
      'm-h3': ['2.441rem', '2.75rem'],
      'm-h2': ['3.052rem', '3.25rem'],
      'm-h1': ['3.815rem', '4.0rem'],
      xsm: ['0.563rem', '0.75rem'],
      sm: ['0.75rem', '1rem'],
      base: ['1rem', '1.5rem'],
      p: ['1rem', '1.5rem'],
      h6: ['1.33rem', '1.75rem'],
      h5: ['1.777rem', '2.25rem'],
      h4: ['2.369rem', '2.5rem'],
      h3: ['3.157rem', '3.5rem'],
      h2: ['4.209rem', '4.5rem'],
      h1: ['5.61rem', '6rem']
    },
    extend: {
      colors: {
        'border': 'hsl(0,0%,0%)'
      },
    },
  },
  plugins: [],
}

