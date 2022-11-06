const path = require("path");

module.exports = {
	devtool: "source-map",
	mode: "development",
	entry: "./src/script.js",
	output: {
		filename: "bundle.js",
		sourceMapFilename: "bundle.js.map",
		path: path.resolve(__dirname, "public"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, path.resolve(__dirname, "./src/_data/")],
			},
		],
	},
};
