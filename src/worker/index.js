/**
 * Only /videos/* comes through here (see run_worker_first in wrangler.toml).
 * iPhones refuse to play video unless a Range request is answered with 206.
 * The asset store is asked first; only if it ignores Range do we cut the slice ourselves.
 * Delete this Worker if `curl -I -H "Range: bytes=0-1" <site>/videos/hero.mp4` already returns 206.
 */
export function parseRange(header, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return undefined;
  let start;
  let end;
  if (m[1] === "") {
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
    const res = await env.ASSETS.fetch(request);
    const rangeHeader = request.headers.get("Range");
    if (request.method !== "GET" || !rangeHeader || res.status !== 200) return res;

    const body = await res.arrayBuffer();
    const size = body.byteLength;
    const headers = new Headers(res.headers);
    headers.set("Accept-Ranges", "bytes");
    const range = parseRange(rangeHeader, size);

    if (range === null) {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    if (!range) return new Response(body, { status: 200, headers });

    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);
    headers.set("Content-Length", String(range.end - range.start + 1));
    return new Response(body.slice(range.start, range.end + 1), { status: 206, headers });
  },
};
