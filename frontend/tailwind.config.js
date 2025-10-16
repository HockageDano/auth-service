/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        neon: {
          "primary": "#8B5CF6", // фіолетовий неон
          "secondary": "#06B6D4", // бірюзовий
          "accent": "#F472B6",
          "neutral": "#1E1E2E",
          "base-100": "#0F0F1B", // темний фон
          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#EAB308",
          "error": "#EF4444",
        },
      },
    ],
    darkTheme: "neon",
  },
};
