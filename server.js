require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }))


const cacheExpirationMilliseconds = 60*5*1000 // 5 minutes

const memCache = {};

const memCacheSet = (key, value) => {
	memCache[key] = {
		expires: Date.now() + cacheExpirationMilliseconds,
		value: value
	};
}

const memCacheGet = (key) => {
	if (memCache[key] && memCache[key]['expires'] > Date.now()) {
		// Cache hit
		return memCache[key]['value'];
	}
	// Cache miss
	delete memCache[key];
	return null;
}




const testData = {
	nextPageToken: 'FFFFFF',
	items: [
		{
			id: '',
			publishedAt: new Date('2026-01-01 00:00:00Z'),
			title: `Title`,
			description: 'Description',
			thumbnailURL: '',
			commentCount: 5
		},
		{
			id: '',
			publishedAt: new Date('2026-01-01 00:00:00Z'),
			title: 'Title 2',
			description: 'Description 2',
			thumbnailURL: '',
			commentCount: 6
		},
		{
			id: '',
			publishedAt: new Date('2026-01-01 00:00:00Z'),
			title: 'Title 3',
			description: 'Description 3',
			thumbnailURL: '',
			commentCount: 7
		},
	]
};



app.get('/search', async (req, res) => {
	const term = req.query.term || '';
	if (term == '') {
		res.json([]);
		return;
	}

	const order = req.query.order || 'relevance';
	const pageToken = req.query.pageToken || '';

	const searchQuery = req.originalUrl

	const cacheTerm = req.originalUrl;

	const cachedResults = memCacheGet(cacheTerm);

	if (cachedResults) {
		console.log(`Cache hit on query ${cacheTerm}`);
		res.json(cachedResults);
		return;
	}

	console.log(`Cache miss on query ${cacheTerm}, retrieving from external API`);

	const response = await fetch(`${process.env.YOUTUBE_API_URL}/search
		?part=snippet
		&q=${term}
		&order=${order}
		&type=video
		&maxResults=50
		${pageToken ? `&pageToken=${pageToken}` : ''}
		&key=${process.env.YOUTUBE_API_KEY}`,
		{
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}
	);

	const json = await response.json();

	const results = await json.items.map((item) => {
		return {
			id: item.id.videoId,
			publishedAt: new Date(item.snippet.publishedAt),
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnailURL: item.snippet.thumbnails.medium.url,
			commentCount: 0
		}
	});

	const returnObject = {
		nextPageToken: json.nextPageToken,
		items: results
	}

	memCacheSet(cacheTerm, returnObject);

	res.json(returnObject);
});

app.listen(3002, () => {
	console.log('listening');
});