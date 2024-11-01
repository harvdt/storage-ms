import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        light: '0px 4px 4px rgba(0, 0, 0, 0.50)',
        bold: '0px 8px 4px rgba(0, 0, 0, 0.50)',
      },
      colors: {
        main: '#BE0916',
        secondary: '#58040A',
        third: '#8E8E89',
      },
      fontFamily: {
        lexend: ['var(--font-lexend)', 'sans-serif'],
        dm_serif_display: ['var(--font-dm_serif_display)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
