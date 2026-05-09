import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        maze: {
          wall: '#0f0f1a',
          path: '#ffffff',
          start: '#2ecc71',
          end: '#e94560',
          visited: '#74b9ff',
          solution: '#ffc107',
          current: '#a855f7',
          mud: '#92400e',
          water: '#1e3a5f',
        },
        surface: {
          dark: '#0a0a14',
          card: '#141422',
          border: '#1e1e36',
        },
      },
    },
  },
  plugins: [],
};

export default config;
