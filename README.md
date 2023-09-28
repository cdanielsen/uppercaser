# Uppercaser

A simple web client-server demo app

## Requirements

An environment with a recent-ish version of [node.js](https://nodejs.org)

## Usage

Install dependencies

```sh
npm i && npm i --prefix src/client
```

Build server and client

```sh
npm run build
```

Start server

```sh
npm start
```

## Development

In development, the client and server are served on their own processes/ports and the client calls to the api are proxied. You can launch these together, develop the app by running

```sh
npm run dev
```

The development app is served by default on http://localhost:5173

For production, the express server serves the client bundle as a static asset in addition to the api. You can preview what a production build would look like by running

```sh
npm run build && npm start
```

The production build is served by default on http://localhost:3001
