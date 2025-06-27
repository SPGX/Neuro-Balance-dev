/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    /* --------------------------------------------------
     *  Make Poppins the default font for the whole app
     *  (Tailwind's `font-sans` utility and all base text)
     * --------------------------------------------------*/
    fontFamily: {
      sans: ["Poppins", "sans-serif"], // <— default font
    },

    extend: {
      /* ---------- Brand Colours & Gradient ---------- */
      colors: {
        "neuro-start": "#90E0AB",
        "neuro-mid": "#0FC1A1",
        "neuro-end": "#106EE8",
      },
      backgroundImage: {
        "neuro-gradient":
          "linear-gradient(180deg, #90E0AB 27.27%, #0FC1A1 40.27%, #106EE8 83.59%)",
      },

      /* ------------- Additional Fonts ------------- */
fontFamily: {
  // 👇 ให้ Noto Sans Thai เป็นค่าเริ่มต้น
  sans: ['"Noto Sans Thai"', 'sans-serif'],

  // ใช้ Poppins เฉพาะเมื่อเรียก class `font-poppins`
  poppins: ['Poppins', 'sans-serif'],

  // สำรองชื่อยาว
  noto: ['"Noto Sans Thai"', 'sans-serif'],
},


      /* -------------- Typography Scale -------------- */
      fontSize: {
        hero: [
          "128px",
          {
            lineHeight: "1", // 100%
            letterSpacing: "0",
          },
        ],
      },

      /* --------------- Custom Animations --------------- */
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
      },
    },
  },
  plugins: [tailwindcssAnimate],
};