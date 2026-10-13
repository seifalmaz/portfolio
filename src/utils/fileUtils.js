/**
 * Utility functions for file handling, MIME types, and document previews.
 */

/**
 * Checks if a URL or path represents a PDF document.
 * Handles query strings (e.g., Supabase storage tokens), hash fragments, and data URIs.
 * @param {string} url - URL or path to inspect
 * @returns {boolean}
 */
export function isPdfUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  const trimmed = url.trim();
  
  // Data URIs or Blob URLs
  if (trimmed.startsWith('data:application/pdf')) return true;
  if (trimmed.startsWith('blob:') && trimmed.toLowerCase().includes('pdf')) return true;

  // Clean URL of queries and fragments
  try {
    const cleanUrl = trimmed.split('?')[0].split('#')[0].toLowerCase();
    return cleanUrl.endsWith('.pdf') || cleanUrl.includes('.pdf');
  } catch {
    return false;
  }
}

/**
 * Extracts a human-readable file name from a URL or storage path.
 * @param {string} url - File URL or path
 * @param {string} defaultName - Fallback name if extraction fails
 * @returns {string}
 */
export function getFileName(url, defaultName = 'Certificate_Document.pdf') {
  if (!url || typeof url !== 'string') return defaultName;
  try {
    const clean = url.split('?')[0].split('#')[0];
    const segments = clean.split('/');
    const rawName = segments[segments.length - 1];
    if (!rawName) return defaultName;

    // Decode URI encoding (e.g. %20 -> space)
    const decoded = decodeURIComponent(rawName);

    // Strip timestamp prefixes like 17456789_
    const stripped = decoded.replace(/^\d+[-_]/, '');
    return stripped || decoded || defaultName;
  } catch {
    return defaultName;
  }
}

/**
 * Formats byte size into human-readable string (KB, MB).
 * @param {number} bytes - Size in bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || Number.isNaN(bytes)) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
