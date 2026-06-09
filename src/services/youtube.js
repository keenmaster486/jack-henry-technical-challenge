import {RequestService} from './request.js';

export const YoutubeService = {
	apiURL: import.meta.env.VITE_YOUTUBE_API_URL,
	search: function (term) {
		const response = RequestService.getSync(`${this.apiURL}/search?term=${term}`);
		return response;
	}
};