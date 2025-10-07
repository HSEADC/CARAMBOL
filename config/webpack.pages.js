const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, filename) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
  });
}

const htmlPages = [
  createPages("./src/index.html", "./index.html"),
  createPages("./src/pages/plants.html", "./pages/plants.html"),
  createPages("./src/pages/instruction.html", "./pages/instruction.html"),
  createPages("./src/pages/tests/test1.html", "./pages/tests/test1.html"),
  createPages("./src/pages/stories/story1.html", "./pages/stories/story1.html"),
  createPages(
    "./src/pages/articles/arcticles1.html",
    "./pages/articles/arcticles1.html"
  ),
];

module.exports = htmlPages;
