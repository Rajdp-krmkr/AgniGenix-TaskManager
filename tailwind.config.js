/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "thm-clr-1": "#2563EB",
        "thm-clr-2": "#FEF08A",
      },
    },
    fontFamily: {
      poppins: ["var(--font-poppins)"],
      bree_serif: ["var(--font-bree_serif)"],
    },
  },
  plugins: [],
};
