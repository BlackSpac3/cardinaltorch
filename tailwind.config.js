/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Montserrat"],
      },
      backgroundImage: {
        about: "url('/aboutimg.jpg')",
        header: "url('/header_img.png')",
        newsletter: "url('/newsletter_bg.jpg')",
      },
      gridTemplateColumns: {
        "auto-fill-280": "repeat(auto-fill, minmax(280px, 1fr))",
      },
      colors: {
        primary: "#2fae60",
        secondary: "#f3b61f",
      },
      screens: {
        tv: { max: "1536px" },
        laptop: { max: "1280px" },
        tab: { max: "1024px" },
        "tab-m": { max: "900px" },
        "tab-s": { max: "768px" },
        phone: { max: "640px" },
        "phone-s": { max: "380px" },
      },
      margin: {
        hero: "4vw",
        body: "7vw",
      },
    },
  },
  plugins: [],
};
