const STRAVA_HEATMAP_BASE_URL = "https://strava-heatmap.tiles.freemap.sk";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const targetUrl = new URL(url.pathname + url.search, STRAVA_HEATMAP_BASE_URL);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

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
    console.error(`Error proxying request to ${targetUrl}:`, error);
    return new Response("Proxy error", { status: 500 });
  }
}

const port = 8000;
console.log(`Proxy server running on http://localhost:${port}`);
Deno.serve({ port }, handler);