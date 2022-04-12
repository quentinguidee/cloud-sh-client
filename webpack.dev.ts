import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.config";

const config = merge<Configuration>(common, {
    mode: "development",
    devtool: "inline-source-map",
    // @ts-ignore
    devServer: {
        host: "localhost",
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
});

export default config;
