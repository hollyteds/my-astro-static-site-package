const cssDeclarationSorter = require('css-declaration-sorter');
const autoPrefixer = require('autoprefixer');
const sortMediaQueries = require('postcss-sort-media-queries');

module.exports = {
  plugins: [
    autoPrefixer,
    cssDeclarationSorter({
      order: 'smacss'
    }),
    sortMediaQueries({
      sort: 'desktop-first' // default
    })
  ],
};
