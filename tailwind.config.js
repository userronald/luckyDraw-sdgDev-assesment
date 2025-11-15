/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neonBg: "#150626",
        neonPurple: "#2f0840",
        neonAccent: "#38f3ff",
        neonPink: "#b33cff",
        neonGlow: "#7b2cff",
      },
      boxShadow: {
        "neon-lg":
          "0 10px 30px rgba(140, 60, 255, 0.35), 0 0 30px rgba(110, 50, 255, 0.25)",
        "neon-card": "0 6px 18px rgba(80, 20, 180, 0.45)",
      },
      keyframes: {
        wheelSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(var(--target))" },
        },
        flashPrize: {
          "0%,100%": {
            color: "#ffffff",
            textShadow: "0 0 12px rgba(255,255,255,0.9)",
          },
          "50%": {
            color: "#ff2b2b",
            textShadow: "0 0 18px rgba(255,50,50,0.9)",
          },
        },
        glowPulse: {
          "0%": { boxShadow: "0 6px 16px rgba(120,50,255,0.14)" },
          "50%": { boxShadow: "0 0 30px rgba(120,40,255,0.35)" },
          "100%": { boxShadow: "0 6px 16px rgba(120,50,255,0.14)" },
        },
        numberPop: {
          "0%": { transform: "translateY(10px) scale(0.95)", opacity: "0.6" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
      },
      animation: {
        "flash-prize": "flashPrize 1s linear infinite",
        "glow-pulse": "glowPulse 2.6s ease-in-out infinite",
        "number-pop": "numberPop 0.45s cubic-bezier(.2,.9,.2,1) forwards",
      },
    },
  },
  plugins: [],
};
