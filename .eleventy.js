const prettier = require("./node_modules/prettier");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/style.css");
	eleventyConfig.addPassthroughCopy("src/script.js");

	// prettify compiled *.html documents in output directory
	eleventyConfig.addTransform("prettier", (content, outputPath) => {
		if (outputPath.endsWith(".html") && process.env.NODE_ENV !== "production") {
			return prettier.format(content, { parser: "html" });
		}
		return content;
	});

	eleventyConfig.addPassthroughCopy({ "backend/public/uploads": "_assets" });
	eleventyConfig.addPassthroughCopy("_assets/fonts");

	return {
		dir: {
			input: "src",
			output: "./public",
			data: "_data",
			includes: "_includes",
		},
		htmlTemplateEngine: "pug",
	};
};
