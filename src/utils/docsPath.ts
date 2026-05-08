const passthroughPattern = /^(?:[a-z][a-z0-9+.-]*:|#)/i;

export function docsPath(path: string): string {
  if (!path || passthroughPattern.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  if (normalizedBase !== '/' && path.startsWith(normalizedBase)) return path;

  return `${normalizedBase}${path.replace(/^\/+/, '')}`;
}

export function stripDocsBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const baseWithoutSlash = normalizedBase.replace(/\/+$/, '');

  if (normalizedBase === '/') return path;
  if (path === baseWithoutSlash) return '/';
  if (path.startsWith(normalizedBase)) return `/${path.slice(normalizedBase.length)}`;

  return path;
}
