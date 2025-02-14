const STRAVA_HEATMAP_BASE_URL = "https://strava-heatmap.tiles.freemap.sk";

async function handler(req: Request): Promise<Response> {
  const startTime = Date.now();
  const url = new URL(req.url);
  const targetUrl = new URL(url.pathname + url.search, STRAVA_HEATMAP_BASE_URL);

  console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname}${url.search}`);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname} - ${response.status} (${duration}ms)`);

    // Create a new response with the same status, headers, and body
    const proxyResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Add CORS headers to allow requests from any origin
    proxyResponse.headers.set("Access-Control-Allow-Origin", "*");
    proxyResponse.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");

    return proxyResponse;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${new Date().toISOString()}] ERROR ${req.method} ${url.pathname} - 500 (${duration}ms):`, error);
    return new Response("Proxy error", { status: 500 });
  }
}

const port = 8000;
console.log(`Proxy server running on http://localhost:${port}`);
Deno.serve({ port }, handler);