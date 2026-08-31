/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14B8A6",
        secondary: "#0D9488",
        accent: "#5EEAD4",

        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },

        lightBg: "#FAFCFB",
        darkBg: "#0F172A",
        lightText: "#1F2937",
        darkText: "#F9FAFB",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 15s ease-in-out infinite",
        "pulse-ring": "pulseRing 3s ease-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "grid-move": "gridMove 20s linear infinite",
        gradient: "gradient 3s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-15px) translateX(8px) rotate(2deg)",
          },
          "50%": {
            transform: "translateY(-8px) translateX(-5px) rotate(-1deg)",
          },
          "75%": {
            transform: "translateY(-20px) translateX(5px) rotate(1deg)",
          },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.2)", opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gridMove: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
