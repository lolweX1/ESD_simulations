export default {
  fetch(request: Request) {
    return new Response("Hello from Cloudflare Worker!", {
      headers: { "Content-Type": "text/plain" },
    });
  }
};
