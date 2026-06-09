export const YoutubeService = {
	apiURL: import.meta.env.YOUTUBE_API_URL,
	search: async function (term) {
		// return [
		// 	{
		// 		publishedAt: new Date('2026-01-01 00:00:00Z'),
		// 		title: 'Title',
		// 		description: 'Description',
		// 		thumbnailURL: '',
		// 		commentCount: 5
		// 	},
		// 	{
		// 		publishedAt: new Date('2026-01-01 00:00:00Z'),
		// 		title: 'Title 2',
		// 		description: 'Description 2',
		// 		thumbnailURL: '',
		// 		commentCount: 6
		// 	},
		// 	{
		// 		publishedAt: new Date('2026-01-01 00:00:00Z'),
		// 		title: 'Title 2',
		// 		description: 'Description 2',
		// 		thumbnailURL: '',
		// 		commentCount: 7
		// 	},
		// ]
		const response = await fetch(`${this.apiURL}/search`);
		return await response.json();
	}
};