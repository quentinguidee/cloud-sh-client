import { join, resolve } from "path";
import { Configuration } from "webpack";

const HtmlWebpackPlugin = require("html-webpack-plugin");

const config: Configuration = {
    entry: "./src/index.tsx",
    output: {
        path: resolve(__dirname, "out"),
        filename: "bundle.[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
        alias: {
            Assets: resolve(__dirname, "src/Assets/"),
            Components: resolve(__dirname, "src/Components/"),
            Pages: resolve(__dirname, "src/Pages/"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, "public", "index.html"),
            filename: "index.html",
        }),
    ],
};

export default config;
