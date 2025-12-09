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
  createPages("./src/pages/articles.html", "./pages/articles.html", ["index"]),
  createPages("./src/pages/aboutus.html", "./pages/aboutus.html", ["index"]),
  createPages("./src/pages/firstaid.html", "./pages/firstaid.html", ["index"]),
  createPages("./src/pages/riskmap.html", "./pages/riskmap.html", ["index"]),
  createPages("./src/pages/tests.html", "./pages/tests.html", ["index"]),
  createPages("./src/styleguide.html", "./styleguide.html", ["styleguide"]),
];

module.exports = htmlPages;
