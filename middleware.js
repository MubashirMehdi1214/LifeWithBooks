/** Edge middleware: ads.txt + strip legacy ?id= duplicates on clean paths. */
const ADS_TXT = 'google.com, pub-5913415234423873, DIRECT, f08c47fec0942fa0\n';

const STRIP_ID_PATH =
  /^\/(book|articles|category|author)\/[A-Za-z0-9_-]+\.html$/;

export default function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === '/ads.txt') {
    return new Response(ADS_TXT, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  // /book/little-women.html?id=little-women → /book/little-women.html
  if (url.searchParams.has('id') && STRIP_ID_PATH.test(url.pathname)) {
    const clean = url.origin + url.pathname;
    return Response.redirect(clean, 301);
  }

  return;
}

export const config = {
  matcher: ['/ads.txt', '/book/:path*', '/articles/:path*', '/category/:path*', '/author/:path*']
};
