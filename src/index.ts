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

    const targetUrl = `https:/${url.pathname}${url.search}`

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