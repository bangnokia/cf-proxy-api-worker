/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/favicon.ico') {
      return new Response('FBI, put your hands up 🦀!', { status: 200 })
    }

    let targetUrl;

    if (url.searchParams.get('url')) {
      targetUrl = url.searchParams.get('url');
    } else {
      const path = url.pathname.slice(1);
      targetUrl = atob(path);
    }

    if (!targetUrl) {
      return new Response('Missing target URL', { status: 400 })
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