/**
 * Cloudflare Worker entry. Static assets are served by Cloudflare as usual; this only steps in for
 * files under /videos/ so they support HTTP Range requests. iPhones (Safari and Chrome on iOS)
 * will not play a video unless the server answers "give me bytes X to Y" with a 206 response.
 */

/** Parses a "bytes=start-end" header into { start, end } or null when it can't be satisfied. */
export function parseRange(header, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return undefined; // not a usable range: send the whole file
  let start;
  let end;
  if (m[1] === "") {
    // Suffix range: the last N bytes.
    start = Math.max(size - parseInt(m[2], 10), 0);
    end = size - 1;
  } else {
    start = parseInt(m[1], 10);
    end = m[2] === "" ? size - 1 : Math.min(parseInt(m[2], 10), size - 1);
  }
  if (start >= size || start > end) return null;
  return { start, end };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isVideo = url.pathname.startsWith("/videos/");
    if (!isVideo || (request.method !== "GET" && request.method !== "HEAD")) {
      return env.ASSETS.fetch(request);
    }

    // Always fetch the whole file from the asset store (no Range, no conditional headers).
    const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
    if (!asset.ok) return asset;

    const body = await asset.arrayBuffer();
    const size = body.byteLength;
    const headers = new Headers();
    headers.set("Content-Type", asset.headers.get("Content-Type") || "video/mp4");
    headers.set("Accept-Ranges", "bytes");
    const cache = asset.headers.get("Cache-Control");
    if (cache) headers.set("Cache-Control", cache);

    const rangeHeader = request.headers.get("Range");
    const range = rangeHeader ? parseRange(rangeHeader, size) : undefined;

    if (range === null) {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }

    if (range) {
      const { start, end } = range;
      headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
      headers.set("Content-Length", String(end - start + 1));
      return new Response(request.method === "HEAD" ? null : body.slice(start, end + 1), { status: 206, headers });
    }

    headers.set("Content-Length", String(size));
    return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });
  },
};
