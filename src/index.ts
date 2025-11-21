const whitelistPaths = [
  "/",
  "/favicon.ico",
  "/robots.txt",
]

export default {
  async fetch(request, env, ctx) {
    console.log('url', request.url)
    const url = new URL(request.url)

    if (whitelistPaths.includes(url.pathname)) {
      return new Response("FBI, put your hands up 🦀!", { "status": 401 })
    }

    // Handle both http:// and https:// in the path
    // e.g., /http://example.com/api or /https://example.com/api or /example.com/api (defaults to https)
    let targetUrl: string
    if (url.pathname.startsWith('/http://') || url.pathname.startsWith('/https://')) {
      // Protocol is explicitly specified in the path
      targetUrl = url.pathname.substring(1) + url.search
    } else {
      // Default to HTTPS
      targetUrl = `https:/${url.pathname}${url.search}`
    }

    const requestOptions = {
      method: request.method,
      headers: {
        ...request.headers,
        'Origin': targetUrl,
      },
    }

    const response = await fetch(targetUrl, requestOptions)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: modifyResponseHeaders(response.headers),
    })
  }
}

function modifyResponseHeaders(originalHeaders: Headers): Headers {
  const headers = new Headers(originalHeaders)

  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return headers
}