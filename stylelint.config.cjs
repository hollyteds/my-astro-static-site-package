module.exports = {
  extends: ["stylelint-config-property-sort-order-smacss"],
  plugins: ["stylelint-order"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  overrides: [
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html"
    }
  ]
};
