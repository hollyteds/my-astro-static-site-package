/** @type {import('prettier').Options} */
module.exports = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 200, // Set the desired line length to 120 characters
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}