/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      boxShadow: {
        primary: "0px 4px 12px 0px rgba(251, 134, 86, 0.25);",
      },
      backgroundImage: {
        "gradient-black": "linear-gradient(90deg, rgba(20, 7, 24, 0.90) 38.54%, rgba(20, 7, 24, 0.30) 100%)",
      },
    },
  },
  plugins: [],
};
