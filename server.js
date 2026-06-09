const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/search', (req, res) => {
	const term = req.query.term || '';
	res.json([
			{
				url: '',
				publishedAt: new Date('2026-01-01 00:00:00Z'),
				title: `Term: ${term}`,
				description: 'Description',
				thumbnailURL: '',
				commentCount: 5
			},
			{
				url: '',
				publishedAt: new Date('2026-01-01 00:00:00Z'),
				title: 'Title 2',
				description: 'Description 2',
				thumbnailURL: '',
				commentCount: 6
			},
			{
				url: '',
				publishedAt: new Date('2026-01-01 00:00:00Z'),
				title: 'Title 3',
				description: 'Description 3',
				thumbnailURL: '',
				commentCount: 7
			},
		]);
});

app.listen(3002, () => {
	console.log('listening');
});