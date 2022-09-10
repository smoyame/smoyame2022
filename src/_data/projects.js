// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
const axios = require("../../node_modules/axios");

module.exports = async () => {
	try {
		const projGet = await axios.get(
			"http://localhost:1337/api/projects?populate=*"
		);
		// let projects = JSON.parse(projGet.data);

		return projGet.data.data.attributes;
	} catch (error) {
		console.error(error);
	}
};
