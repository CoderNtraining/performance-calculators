import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        panel: '#111827',
        panelAlt: '#1f2937',
      },
    },
  },
  plugins: [],
};

export default config;
