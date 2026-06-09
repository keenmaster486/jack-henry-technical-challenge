export const RequestService = {
	get: (url) => {
		return fetch(url, {
			method: 'GET',
			headers: []
		});
	},
	post: (url, json) => {
		return fetch(url, {
			method: 'POST',
			headers: [],
			body: JSON.stringify(json)
		});
	},
	getSync: (url, options) => {
		const request = new XMLHttpRequest();
		request.open('GET', url, false);
		request.send();
		if (request.status == 200) {
			return JSON.parse(request.response);
		} else {
			return {}
		}
	}
};