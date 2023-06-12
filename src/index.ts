export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if ((url.pathname === '/' || url.pathname === '/favicon.ico') && url.searchParams.get('url') === null) {
      return new Response('FBI, put your hands up 🦀!', { status: 200 })
    }

    let targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
      // here we parse the path as base64 encoded url
      const path = url.pathname.slice(1);
      targetUrl = atob(path);
    }

    if (!targetUrl) {
      return new Response('Nothing to do', { status: 200 })
    }

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