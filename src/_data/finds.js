const axios = require("../../node_modules/axios");

module.exports = async () => {
	try {
		const findGet = await axios.get(
			"http://192.168.0.121:1337/api/finds?populate=*"
		);
		// axios delivers it as JS object already thank goodness

		return findGet.data.data.map((find) => find.attributes);
	} catch (error) {
		console.error(error);
	}
};
