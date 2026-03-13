import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        skysoft: '#eaf6ff',
        mintsoft: '#eaf9f0',
        sand: '#fff9ef',
        ink: '#1f2937'
      }
    }
  },
  plugins: []
};
export default config;
