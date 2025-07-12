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
        tealPrimary: "#0FC1A1",
        grayText: "#6E6E73",
        blackText: "#222225",
        blackTextB2: "#222225B2",
        blackTextE4: "#3E3E44",
      },
      letterSpacing: {
        tighter: "-0.02em",
      },
      fontSize: {
        hero: [
          "clamp(64px, 10vw, 96px)",
          {
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
        "fade-in-up-delayed": "fade-in-up 1s ease-out 200ms both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
