const axios = require("../../node_modules/axios");
require("dotenv").config();
module.exports = async () => {
	try {
		const abtGet = await axios.get(
			`${process.env.STRAPIAPI}/api/about?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPIAPI_KEY}`,
				},
			}
		);
		// axios delivers it as JS object already thank goodness

		return abtGet.data.data.attributes;
	} catch (error) {
		console.error(error);
	}
};
