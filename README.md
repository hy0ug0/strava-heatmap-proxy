# Strava Heatmap Proxy

A simple CORS proxy server for Strava's heatmap tiles.

## Purpose

Strava's heatmap tiles don't have CORS headers enabled, making them difficult to use in web applications. This proxy forwards requests to Strava's heatmap server and adds CORS headers to allow cross-origin access from any domain.

## Stack

- **Deno** - TypeScript runtime
- **TypeScript** - Application logic

## How it Works

1. Receives HTTP requests on port 8000
2. Forwards them to Strava's heatmap server (`https://heatmap-external-c.strava.com/tiles/`)
3. Adds CORS headers (`Access-Control-Allow-Origin: *`) to the response
4. Returns the proxied response with all original headers intact

## Usage

### With Docker

```bash
docker build -t strava-heatmap-proxy .
docker run -p 8000:8000 strava-heatmap-proxy
```

### With Deno

```bash
deno run --allow-net main.ts
```

For development with hot reload:

```bash
deno task dev
```

The proxy will be available at `http://localhost:8000`.
