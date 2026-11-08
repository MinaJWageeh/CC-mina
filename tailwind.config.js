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
        industrial: {
          950: '#0a0d14',
          900: '#0f1420',
          850: '#151c2c',
          800: '#1b2336',
          700: '#28344e',
          600: '#384869',
          500: '#4d6189',
        },
        electric: {
          l1: '#f87171',    // Red-Orange (Phase 1)
          l2: '#facc15',    // Gold/Yellow (Phase 2)
          l3: '#60a5fa',    // Bright Blue (Phase 3)
          neutral: '#22d3ee', // Cyan / Light Blue (Neutral)
          pe: '#4ade80',     // Green (Earth/PE)
          dcPos: '#fb7185',  // Rose/Red (+24V)
          dcNeg: '#94a3b8',  // Slate (0V)
          off: '#334155',    // Muted dark slate (Dead / off)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(248, 113, 113, 0.65)',
        'glow-yellow': '0 0 15px rgba(250, 204, 21, 0.65)',
        'glow-blue': '0 0 15px rgba(96, 165, 250, 0.65)',
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.65)',
        'glow-green': '0 0 15px rgba(74, 222, 128, 0.65)',
      }
    },
  },
  plugins: [],
}
