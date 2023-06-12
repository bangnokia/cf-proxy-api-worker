# An simple proxy API using Cloudflare Worker

## Usage

This is a simple proxy API using Cloudflare Worker. It can be used to bypass CORS restrictions.

When you want to access the url: `https://api.example/com/posts` but it has CORS restrictions, you can use this proxy API to bypass it.

Just replace the url with `https://proxy-api.yourdomain.com/api.example/com/posts` and you will get the response.