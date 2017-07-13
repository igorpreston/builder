const { resolve } = require('path');

const srcPath = resolve(__dirname, 'src');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: srcPath,
    }),
    require('postcss-url')(),
    require('postcss-cssnext')(),
  ],
};
