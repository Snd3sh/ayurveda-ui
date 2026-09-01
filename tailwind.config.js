/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Display serif for headings — evokes manuscript / tradition
        serif: ["Fraunces", "Georgia", "serif"],
        // Body sans stays clean and readable
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        // Saffron / marigold — primary accent
        primary: "#E2963B",
        secondary: "#C97A22",
        accent: "#7A2333", // deep maroon accent for contrast highlights

        // "teal" scale repurposed as the saffron/marigold accent scale so
        // existing teal-* utility classes across the app pick up the new palette
        teal: {
          50: "#FDF6EA",
          100: "#FAEACB",
          200: "#F3D398",
          300: "#EBBA6C",
          400: "#E2963B",
          500: "#C97A22",
          600: "#A8621A",
          700: "#874E16",
          800: "#6B3E13",
          900: "#4A2A0D",
        },

        // Deep maroon scale for secondary accents / contrast text
        maroon: {
          50: "#FBEEEF",
          100: "#F0CFD2",
          200: "#DE9CA1",
          300: "#C56A71",
          400: "#A3414A",
          500: "#7A2333",
          600: "#631C29",
          700: "#4A1620",
          800: "#341018",
          900: "#220A10",
        },

        // "gray" scale repurposed as warm sandalwood/espresso neutrals so
        // every existing gray-* class (light & dark mode) reads warm, not cool
        gray: {
          50: "#FBF6EC",
          100: "#F5EBD8",
          200: "#EADCC2",
          300: "#D8C4A0",
          400: "#B69E78",
          500: "#8F7A5C",
          600: "#6B5A44",
          700: "#4A3D2E",
          800: "#33291D",
          900: "#231B13",
        },

        lightBg: "#FBF3E4",
        darkBg: "#1C130D",
        lightText: "#2B1D14",
        darkText: "#F3E7D0",
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
        "reveal-up": "revealUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pop-in": "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
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
        revealUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
