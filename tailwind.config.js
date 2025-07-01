/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans Thai"', "Poppins", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      noto: ['"Noto Sans Thai"', "sans-serif"],
    },
    extend: {
      colors: {
        "neuro-start": "#90E0AB",
        "neuro-mid": "#0FC1A1",
        "neuro-end": "#106EE8",
      },
      backgroundImage: {
        "neuro-gradient":
          "linear-gradient(180deg, #90E0AB 27.27%, #0FC1A1 40.27%, #106EE8 83.59%)",
      },
      fontSize: {
        hero: [
          "clamp(64px, 10vw, 96px)",
          {
            lineHeight: "1",
            letterSpacing: "0",
          },
        ],
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-24px)" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-y": "float-y 4s ease-in-out infinite",
        "slide-in-top": "slide-in-top 1s ease-out both",
        "fade-in-up": "fade-in-up 1s ease-out both",
        "fade-in-up-delayed": "fade-in-up 1s ease-out 200ms both", // Support delay-200
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
