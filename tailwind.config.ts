import type { Config } from 'tailwindcss';

const config: Config = {
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
      colors: {
        main: "#BE0916",
        secondary: "#58040A",
        third: "#8E8E89",
      },
      fontFamily: {
        lexend: ["var(--font-lexend)", "sans-serif"],
  			dm_serif_display: ["var(--font-dm_serif_display)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
