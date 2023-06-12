# An simple proxy API using Cloudflare Worker

This is a simple proxy API using Cloudflare Worker. It can be used to bypass CORS restrictions.

## Usage


When you want to access the url: `https://api.example/posts` but it has CORS restrictions, you can use this proxy API to bypass it. Just append the domain as the fisrt path of the url, and other paths and query strings to the rest of the url.

```
https://api.example/posts??page=1
```

into

```
https://your.workers.dev/api.example/posts?page=1
```