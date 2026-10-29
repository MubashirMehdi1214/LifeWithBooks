/** Edge middleware: ads.txt + one-hop SEO redirects for legacy/duplicate URLs. */
const ADS_TXT = 'google.com, pub-5913415234423873, DIRECT, f08c47fec0942fa0\n';

const CLEAN_CONTENT_PATH =
  /^\/(book|articles|category|author)\/[A-Za-z0-9_-]+\.html$/;

/** Nested shells that should map ?cat= to /category/:cat.html — not strip. */
const NESTED_CATEGORY_SHELLS = new Set([
  '/book/category.html',
  '/category/category.html',
  '/articles/category.html',
  '/author/category.html'
]);

function redirect(url, pathname) {
  return Response.redirect(url.origin + pathname, 301);
}

function safeSlug(value) {
  return value && /^[A-Za-z0-9_-]+$/.test(value) ? value : null;
}

export default function middleware(request) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  if (pathname === '/ads.txt') {
    return new Response(ADS_TXT, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  // Old shells → clean static URLs (strip query in one hop)
  if (pathname === '/book.html') {
    const id = safeSlug(searchParams.get('id'));
    return redirect(url, id ? `/book/${id}.html` : '/all-books.html');
  }

  if (pathname === '/article.html') {
    const id = safeSlug(searchParams.get('id'));
    return redirect(url, id ? `/articles/${id}.html` : '/articles.html');
  }

  if (pathname === '/category.html') {
    const cat = safeSlug(searchParams.get('cat'));
    return redirect(url, cat ? `/category/${cat}.html` : '/all-books.html');
  }

  // Nested mistaken shells: /book/category.html?cat=foo → /category/foo.html
  if (NESTED_CATEGORY_SHELLS.has(pathname)) {
    const cat = safeSlug(searchParams.get('cat'));
    return redirect(url, cat ? `/category/${cat}.html` : '/all-books.html');
  }

  // /book/foo.html?id=... or ?cat=... → /book/foo.html
  if (
    CLEAN_CONTENT_PATH.test(pathname) &&
    (searchParams.has('id') || searchParams.has('cat'))
  ) {
    return redirect(url, pathname);
  }

  return;
}

export const config = {
  matcher: [
    '/ads.txt',
    '/book.html',
    '/article.html',
    '/category.html',
    '/book/:path*',
    '/articles/:path*',
    '/category/:path*',
    '/author/:path*'
  ]
};
