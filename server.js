const express = require('express');

const app = express();

app.use(express.json());

app.get('/search', (req, res) => {
	res.json([
			{
				publishedAt: new Date('2026-01-01 00:00:00Z'),
				title: 'Title',
				description: 'Description',
				thumbnailURL: '',
				commentCount: 5
			},
			{
				publishedAt: new Date('2026-01-01 00:00:00Z'),
				title: 'Title 2',
				description: 'Description 2',
				thumbnailURL: '',
				commentCount: 6
			},
			{
				publishedAt: new Date('2026-01-01 00:00:00Z'),
				title: 'Title 2',
				description: 'Description 2',
				thumbnailURL: '',
				commentCount: 7
			},
		]);
});

app.listen(3002, () => {
	console.log('listening');
});