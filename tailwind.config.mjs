export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        huge: "50px",
      },
      keyframes: {
        rippling: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        grid: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        rippling: "rippling var(--duration) ease-out",
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        grid: "grid 15s linear infinite",
      },
      colors: {
        muted: "#f3f4f6",
        foreground: "#333",
        primary: "#3490dc",
        secondary: "#6c757d",
        danger: "#e3342f",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn": {
          "@apply px-4 py-2 bg-primary font-semibold font-bold rounded-lg shadow-md focus:outline-none focus:ring-2":
            "",
        },
        ".btn-primary": {
          "@apply bg-primary rounded p-3 text-white font-bold hover:bg-blue-600 focus:ring-primary":
            "", // Apply valid focus:ring class
        },
        ".btn-secondary": {
          "@apply bg-secondary text-white font-bold hover:bg-gray-600 focus:ring-secondary":
            "", // Apply valid focus:ring class
        },
        ".btn-danger": {
          "@apply bg-danger  p-2 border-[red] text-white font-bold hover:bg-red-600 focus:ring-danger":
            "", // Apply valid focus:ring class
        },
      });
    },
  ],
};