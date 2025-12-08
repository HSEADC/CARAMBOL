const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks,
  });
}

const htmlPages = [
  createPages("./src/index.html", "./index.html", ["index"]),
  createPages("./src/pages/plants.html", "./pages/plants.html", ["index"]),
  createPages("./src/pages/aboutus.html", "./pages/aboutus.html", ["index"]),
  createPages("./src/styleguide.html", "./styleguide.html", ["styleguide"]),
];

module.exports = htmlPages;
