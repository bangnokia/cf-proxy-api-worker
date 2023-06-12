# An simple proxy API using Cloudflare Worker

This is a simple proxy API using Cloudflare Worker. It can be used to bypass CORS restrictions.

## Usage


When you want to access the url: `https://api.example/com/posts` but it has CORS restrictions, you can use this proxy API to bypass it.

Just replace the url with `https://your.workers.dev/api.example/com/posts` and you will get the response.