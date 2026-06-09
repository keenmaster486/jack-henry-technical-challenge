import {RequestService} from './request.js';

export const YoutubeService = {
	apiURL: import.meta.env.VITE_YOUTUBE_API_URL,
	search: function (term, order, pageToken) {
		const response = RequestService.getSync(`${this.apiURL}/search?term=${term}&order=${order}&pageToken=${pageToken}`);
		return response;
	}
};