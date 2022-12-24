const axios = require("../../node_modules/axios");
require("dotenv").config();

module.exports = async () => {
	try {
		const projGet = await axios.get(
			`${process.env.STRAPIAPI}/api/projects?populate[cover][populate]=*,image,area&populate[outcomes][populate]=*&populate[tags][populate]=discipline`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPIAPI_KEY}`,
				},
			}
		);
		// axios delivers it as JS object already thank goodness

		return projGet.data.data.map((project) => project.attributes);
	} catch (error) {
		console.error(error);
	}
};
