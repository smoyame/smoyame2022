const axios = require("../../node_modules/axios");

module.exports = async () => {
	try {
		const abtGet = await axios.get(
			"http://localhost:1337/api/about?populate=*"
		);
		// axios delivers it as JS object already thank goodness

		return abtGet.data.data.attributes;
	} catch (error) {
		console.error(error);
	}
};
