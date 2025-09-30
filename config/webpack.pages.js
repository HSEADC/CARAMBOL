const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, filename) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
  });
}

const htmlPages = [
  createPages("./src/index.html", "./index.html"),
  createPages("./src/pages/articles.html", "./pages/articles.html"),
  createPages("./src/pages/tests.html", "./pages/tests.html"),
  createPages("./src/pages/dictionary.html", "./pages/dictionary.html"),
  createPages(
    "./src/pages/articles/plants.html",
    "./pages/articles/plants.html"
  ),
  createPages("./src/pages/tests/test1.html", "./pages/tests/test1.html"),
];

module.exports = htmlPages;
