# jack-henry-technical-challenge

This application consists of a Lit frontend and a small Express backend that mediates the YouTube API and caches data to get around request quotas.

Make sure you create a .env that matches that .env.example file, with your YouTube API key filled in.

To run:

npm install
npx vite

In a separate terminal window:

node server.js



Architectural Decision Record

1. Although Typescript would be a better choice for a real application, for this demo I chose ordinary Javascript because I wanted to focus on learning Lit and speed of development over messing with types.
2. State management: I chose a custom native browser event approach due to its simplicity and the fact that I only needed two event types and didn't need anything more complex.