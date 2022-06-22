const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        host: "localhost",
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
});
