const axios = require("../../node_modules/axios");

module.exports = async () => {
	try {
		const projGet = await axios.get(
			"http://localhost:1337/api/projects?populate[cover][populate]=*,image&populate[outcomes][populate]=*&populate[Tags][populate]=*"
		);
		// axios delivers it as JS object already thank goodness

		return projGet.data.data.map((project) => project.attributes);
	} catch (error) {
		console.error(error);
	}
};
