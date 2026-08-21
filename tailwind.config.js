/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Off-White, Light Grey & Grey Editorial Palette
        'theme-bg': '#F6F6F4',             // Soft warm off-white canvas
        'theme-card': '#FFFFFF',           // Crisp white for contrast cards
        'theme-surface': '#EDEDE9',        // Light grey for distinct section blocks
        'theme-surface-subtle': '#F2F2EE', // Subtle warm light grey for card backgrounds
        'theme-surface-alt': '#E4E4DE',    // Mid-light grey for badges and containers
        'theme-elevated': '#DFDFD8',       // Slightly deeper grey for active states
        'theme-border': '#DFDFD7',         // Delicate light grey hairline border
        'theme-border-strong': '#C6C6BD',  // Defined grey structural border
        'theme-text': '#141413',           // Deep charcoal primary text
        'theme-muted': '#64645E',          // Medium grey secondary text
        'theme-subtle': '#92928A',         // Soft muted grey metadata & captions
        'theme-accent': '#1C1C1A',         // Deep graphite accent
        'theme-accent-soft': '#E8E8E2',    // Light grey pill background
        'theme-accent-border': '#D2D2CA',  // Subtle light grey border for pills
        'theme-dark': '#0E0E0D',           // Pure charcoal-black

        // Compatibility remapping
        'theme-blue': '#1C1C1A',
        'theme-blue-light': '#2E2E2B',
        'theme-blue-dark': '#0E0E0D',
        'theme-blue-soft': '#E8E8E2',
        'theme-blue-border': '#D2D2CA',
        'theme-blue-glow': 'rgba(28, 28, 26, 0.05)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'tech-grid-light': 'linear-gradient(to right, rgba(210, 210, 202, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 210, 202, 0.45) 1px, transparent 1px)',
      },
      boxShadow: {
        'nav-light': '0 4px 20px -5px rgba(20, 20, 19, 0.03), 0 1px 3px -1px rgba(20, 20, 19, 0.02)',
        'card-light': '0 2px 8px -2px rgba(20, 20, 19, 0.03), 0 1px 2px 0 rgba(20, 20, 19, 0.02)',
        'card-hover': '0 12px 28px -8px rgba(20, 20, 19, 0.07), 0 2px 4px -1px rgba(20, 20, 19, 0.02)',
        'subtle': '0 1px 2px 0 rgba(20, 20, 19, 0.04)',
      }
    },
  },
  plugins: [],
}
