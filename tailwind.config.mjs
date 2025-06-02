/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        convex: {
          'dark-blue': '#0F206C',
          'medium-blue': '#416BA9',
          'light-blue': '#6AAAE4',
          'sky-blue': '#EBF7FF',
          white: '#F5F7FD'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono'],
        "source-sans-pro": ['Source Sans Pro', 'sans-serif']
      },
    },
  },
  plugins: [],
} 