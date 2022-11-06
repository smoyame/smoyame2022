const axios = require("../../node_modules/axios");
require("dotenv").config();
module.exports = async () => {
	try {
		const orderingGet = await axios.get(
			`${process.env.STRAPIAPI}/api/ordering?populate[projects][populate]=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPIAPI_KEY}`,
				},
			}
		);

		// axios delivers it as JS object already thank goodness

		return orderingGet.data.data.attributes;
	} catch (error) {
		console.error(error);
	}
};
