require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }))

const cache = {
	cache: {},
	expirationMilliseconds: 60*60*24*1000, // 1 day,
	getItem: (key) => {
		if (cache.cache[key] && cache.cache[key]['expires'] > Date.now()) {
			// Cache hit
			return cache.cache[key]['value'];
		}
		// Cache miss
		delete cache.cache[key];
		return null;
	},
	setItem: (key, value) => {
		cache.cache[key] = {
			expires: Date.now() + cache.expirationMilliseconds,
			value: value
		};
	},
	save: () => {
		fs.writeFile('./cache.json', JSON.stringify(cache.cache), 'utf8', (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Saved cache');
			}
		});
	},
	load: () => {
		try {
			const json = fs.readFileSync('./cache.json', 'utf8');
			cache.cache = JSON.parse(json);
			console.log('Loaded cache');
		} catch (e) {
			console.log('Error reading cache file. It probably doesn\'t exist yet. Trying to save it:');
			cache.save();
		}
	}
};
cache.load();

const testData = {
	nextPageToken: 'FFFFFF',
	items: [
		{
			id: '',
			publishedAt: new Date('2026-01-01 00:00:00Z'),
			title: `Title`,
			description: 'Description',
			thumbnailURL: '',
			statistics: {
				viewCount: 0,
				likeCount: 0,
				commentCount: 0
			}
		},
		{
			id: '',
			publishedAt: new Date('2026-01-01 00:00:00Z'),
			title: 'Title 2',
			description: 'Description 2',
			thumbnailURL: '',
			statistics: {
				viewCount: 0,
				likeCount: 0,
				commentCount: 0
			}
		},
		{
			id: '',
			publishedAt: new Date('2026-01-01 00:00:00Z'),
			title: 'Title 3',
			description: 'Description 3',
			thumbnailURL: '',
			statistics: {
				viewCount: 0,
				likeCount: 0,
				commentCount: 0
			}
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

	const cachedResults = cache.getItem(cacheTerm);

	if (cachedResults) {
		console.log(`Cache hit on query ${cacheTerm}`);
		res.json(cachedResults);
		return;
	}

	console.log(`Cache miss on query ${cacheTerm}, retrieving from external API`);

	const videosResponse = await fetch(`${process.env.YOUTUBE_API_URL}/search
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

	const videosJson = await videosResponse.json();

	const videoIds = await videosJson.items.map((item) => {
		return item.id.videoId;
	});

	const statsResponse = await fetch(`${process.env.YOUTUBE_API_URL}/videos:batchGetStats
		?id=${videoIds.join(',')}
		&part=statistics
		&key=${process.env.YOUTUBE_API_KEY}`,
		{
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}
	);

	const statsJson = await statsResponse.json();

	const videoStats = {};
	await statsJson.items.forEach((item) => {
		videoStats[item.id] = item.statistics;
	});

	const results = await videosJson.items.map((item) => {
		const video = {
			id: item.id.videoId,
			publishedAt: new Date(item.snippet.publishedAt),
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnailURL: item.snippet.thumbnails.medium.url,
			statistics: videoStats[item.id.videoId]
		};
		cache.setItem(video.id, video);
		return video;
	});

	const returnObject = {
		nextPageToken: await videosJson.nextPageToken,
		items: await results
	}

	cache.setItem(cacheTerm, await returnObject);

	cache.save();
	res.json(await returnObject);
});

app.get('/videos', async (req, res) => {
	// Accepts an array of video ids and tries to return info for the videos
	const videoIdsString = req.query.ids || '';
	const videoIds = videoIdsString.split(',');

	if (!videoIds.length) {
		res.json([]);
		return;
	}

	console.log(`Getting video info for ${videoIds.length} videos`);
	// Separate out into cache hits and misses:

	const cachedVideos = [];
	const unCachedVideoIds = [];

	videoIds.forEach((id) => {
		const cachedVideo = cache.getItem(id);
		if (cachedVideo) {
			cachedVideos.push(cachedVideo);
		} else {
			unCachedVideoIds.push(id);
		}
	});

	console.log(`Cache hits for ${cachedVideos.length} videos and cache misses for ${unCachedVideoIds.length} videos ${unCachedVideoIds.length ? `, retrieving ${unCachedVideoIds.length} videos from external API` : ''}`);

	let videos = [];

	if (unCachedVideoIds.length) {
		const videosResponse = await fetch(`${process.env.YOUTUBE_API_URL}/videos
			?id=${videoIds.join(',')}
			&part=snippet,statistics
			&maxResults=50
			&key=${process.env.YOUTUBE_API_KEY}`,
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			}
		);

		const videosJson = await videosResponse.json();

		console.log(videosJson);

		videos = await videosJson.items.map((item) => {
			return {
				id: item.id,
				publishedAt: new Date(item.snippet.publishedAt),
				title: item.snippet.title,
				description: item.snippet.description,
				thumbnailURL: item.snippet.thumbnails.medium.url,
				statistics: item.statistics
			};
		});

		await videos.forEach((item) => {
			if (cache.getItem(item.id)) {
				cache.setItem(item.id, item);
			}
		});
		cache.save();
	}

	await videos.push(...cachedVideos);

	// console.log(await videos);
	res.json(await videos);
});

app.listen(3002, () => {
	console.log('listening');
});