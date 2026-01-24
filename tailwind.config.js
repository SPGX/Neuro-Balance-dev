/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      // heavent: ["DBHeaventRounded"],
      sans: ['"Noto Sans Thai"', "Poppins", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      noto: ['"Noto Sans Thai"', "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        blackText: "#1D2126",
        blackTextE4: "#3E3E44",
        white: "#FFFFFF",
        tealPrimary: "#0FC1A1",
        grayText: "#A3A3A3",
        lightBlue: "#106EE8"
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px",
        48: "48px",
        64: "64px",
        75: "75px",
        96: "96px",
        hero: [
          "clamp(48px, 10vw, 72px)",
          {
            letterSpacing: "0",
            lineHeight: "100%",
          },
        ],
      },
      lineHeight: {
        100: "100%",
        28: "28px",
        30: "30px",
        36: "36px",
        50: "50px",
        74: "74px",
      },
      letterSpacing: {
        tighter: "-0.02em",
        normal: "0em",
      },
      backgroundImage: {
        "hero-th-gradient":
          "linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)",
        "hero-en-gradient":
          "linear-gradient(97.59deg, #0FC1A1 1.28%, #00AAFF 100%)",
        "hero-desc-gradient":
          "linear-gradient(97.59deg, #1D2126 1.28%, #3E3E44 100%)",
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
        "partner-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "partner-marquee-tablet": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "partner-marquee-mobile": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "grow-in": {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(24px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "grow-in": "grow-in 0.7s cubic-bezier(0.37,0,0.63,1) both",
        "grow-in-delay": "grow-in 0.7s cubic-bezier(0.37,0,0.63,1) 0.15s both",
        "float-y": "float-y 4s ease-in-out infinite",
        "slide-in-top": "slide-in-top 1s ease-out both",
        "fade-in-up": "fade-in-up 1s ease-out both",
        "fade-in-up-delayed": "fade-in-up 1s ease-out 200ms both",
        "partner-marquee": "partner-marquee 20s linear infinite",
        "partner-marquee-tablet": "partner-marquee-tablet 25s linear infinite",
        "partner-marquee-mobile": "partner-marquee-mobile 30s linear infinite",
      },
      screens: {
        lgMid: "1000px",
        '3xl': '1920px', // Full HD+
        '4xl': '2560px', // 2K/4K screen
        
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
