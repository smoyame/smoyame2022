const axios = require("../../node_modules/axios");
require("dotenv").config();

module.exports = async () => {
	try {
		const sketchbookGet = await axios.get(
			`${process.env.STRAPIAPI}/api/sketches?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPIAPI_KEY}`,
				},
			}
		);
		// axios delivers it as JS object already thank goodness

		return sketchbookGet.data.data.map((sketchbook) => sketchbook.attributes);
	} catch (error) {
		console.error(error);
	}
};
