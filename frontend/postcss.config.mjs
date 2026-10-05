// Compiles Tailwind CSS v4 (the `@import "tailwindcss"` in src/index.css).
// Must live inside the project so it also runs on Vercel.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
