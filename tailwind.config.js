/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'm-xsm': ['0.64rem', '0.75rem'],
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
        'border': 'hsl(0, 0%, 35%)',
        // 'focus-outline': 	'hsl(216,100%,50%)',
        'focus-outline': 	'hsl(217, 39%, 53%)',
        'background': 'hsl(221, 27%, 21%)',
        'icon': 'hsl(0, 0%, 35%)',
        'light-icon': 'hsl(202, 50%, 97%)',
        'card': 'hsl(202, 50%, 97%)',
        'text': 'hsl(0, 0%, 7%)',
        'light-text': 'hsl(202, 50%, 97%)',
        'san-marino': {
          '50': 'hsl(202, 50%, 97%)',
          '100': 'hsl(212, 46%, 93%)',
          '200': 'hsl(209, 45%, 87%)',
          '300': 'hsl(208, 45%, 78%)',
          '400': 'hsl(209, 44%, 68%)',
          '500': 'hsl(213, 42%, 60%)',
          '600': 'hsl(217, 39%, 53%)',
          '700': 'hsl(220, 36%, 50%)',
          '800': 'hsl(222, 33%, 40%)',
          '900': 'hsl(221, 30%, 33%)',
          '950': 'hsl(221, 27%, 21%)',
        },
    
      },
    },
  },
  plugins: [],
}

