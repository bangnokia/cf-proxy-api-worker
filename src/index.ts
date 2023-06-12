const whitelistPaths = [
  "/",
  "/favicon.ico",
  "/robots.txt",
]

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (whitelistPaths.includes(url.pathname)) {
      return new Response("FBI, put your hands up 🦀!", { "status": 401 })
    }

    // target url is the https:/ + the path of the request and the query string
    const targetUrl = `https:/${url.pathname}${url.search}`
    console.log('target url', targetUrl)

    const requestOptions = {
      method: request.method,
      headers: {
        ...request.headers,
        'Origin': targetUrl, // Set the target URL as the origin header
      },
    }

    const response = await fetch(targetUrl, requestOptions)

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Allow all origins (you can customize this if needed)
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers([
        ...response.headers.entries(),
        ...Object.entries(corsHeaders),
      ])
    })
  }
};