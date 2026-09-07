/**
 * Helper to resolve static asset paths correctly across local dev and GitHub Pages base paths
 * @param {string} path - e.g. '/images/boy.png' or 'images/boy.png'
 * @returns {string} - resolved URL with base path included
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${cleanPath}`;
};

export default getAssetUrl;
