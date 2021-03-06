const tailwindcss = require("tailwindcss");

const cssnano = require("cssnano")({ preset: 'default', });

// only needed if you want to purge
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),

    // minify the css only in production
    ...(process.env.NODE_ENV === "production" ? [cssnano] : []),

    // only needed if you want to purge
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};