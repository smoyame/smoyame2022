const axios = require("../../node_modules/axios");

module.exports = async () => {
	try {
		const orderingGet = await axios.get(
			"http://localhost:1337/api/ordering?populate[projects][populate]=*"
		);
		// axios delivers it as JS object already thank goodness

		return orderingGet.data.data.attributes;
	} catch (error) {
		console.error(error);
	}
};
