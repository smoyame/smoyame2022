const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/script.js",
	output: {
		filename: "bundle.js",
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
