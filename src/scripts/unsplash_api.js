import axios from "axios";

const searchPhotos = async (query, color, orientation, page) => {
	if (query === "") {
		return [];
	}
	const params = {
		query,
		color: color || null,
		orientation: orientation || null,
		per_page: 15,
		page,
	};

	const response = await axios.get("https://api.unsplash.com/search/photos", {
		headers: {
			Authorization:
				"Client-ID bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs", // tactacam id
			// "Client-ID 5AG0ATARu3QD-TJSIxoesuILrDXecPd0XM6Zuh0EDbY", // my id
		},
		params,
	});

	return response.data.results;
};

export default searchPhotos;
