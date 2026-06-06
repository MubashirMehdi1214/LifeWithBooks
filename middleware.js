/** Serve ads.txt with 200 on every host (apex + www) for AdSense crawlers. */
const ADS_TXT = 'google.com, pub-5913415234423873, DIRECT, f08c47fec0942fa0\n';

export default function middleware(request) {
  if (new URL(request.url).pathname === '/ads.txt') {
    return new Response(ADS_TXT, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}

export const config = {
  matcher: '/ads.txt'
};
