const axios = require("../../node_modules/axios");
require("dotenv").config();
module.exports = async () => {
	try {
		const findGet = await axios.get(
			`${process.env.STRAPIAPI}/api/finds?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPIAPI_KEY}`,
				},
			}
		);
		// axios delivers it as JS object already thank goodness

		return findGet.data.data.map((find) => find.attributes);
	} catch (error) {
		console.error(error);
	}
};
