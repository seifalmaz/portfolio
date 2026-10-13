/**
 * PDF Thumbnail Generator Utility
 * 
 * Uses Mozilla's PDF.js (pdfjs-dist) with lazy loading to render page 1 of certificate PDFs
 * into high-fidelity image thumbnails without bloating the initial JavaScript bundle.
 * 
 * Features:
 * - Lazy-loaded pdfjs-dist module
 * - In-memory and sessionStorage caching
 * - In-flight deduplication (prevents concurrent renders of the same PDF)
 * - Returns optimized WebP/JPEG data URLs
 * - Helper for Admin upload to convert uploaded PDF File -> Image Blob for Supabase Storage
 */

import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// In-memory cache: pdfUrl -> dataUrl
const thumbnailMemoryCache = new Map();
// In-flight promises: pdfUrl -> Promise<string>
const inFlightRequests = new Map();

let pdfjsLibPromise = null;

async function getPdfJs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist').then((lib) => {
      if (lib.GlobalWorkerOptions && !lib.GlobalWorkerOptions.workerSrc) {
        lib.GlobalWorkerOptions.workerSrc = pdfWorker;
      }
      return lib;
    });
  }
  return pdfjsLibPromise;
}

/**
 * Generates an image thumbnail data URL from page 1 of a PDF.
 * @param {string|File|Blob} source - PDF public URL, File, or Blob
 * @param {object} options - Sizing and format options
 * @returns {Promise<string>} Base64 Data URL (image/webp or image/jpeg)
 */
export async function getPdfThumbnail(source, options = {}) {
  const {
    targetWidth = 600,
    quality = 0.85,
    format = 'image/webp'
  } = options;

  if (!source) return null;

  const cacheKey = typeof source === 'string' ? source : (source.name ? `${source.name}-${source.size}` : null);

  // 1. Check in-memory cache
  if (cacheKey && thumbnailMemoryCache.has(cacheKey)) {
    return thumbnailMemoryCache.get(cacheKey);
  }

  // 2. Check in-flight promise to prevent duplicate concurrent rendering
  if (cacheKey && inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const renderPromise = (async () => {
    try {
      const pdfjs = await getPdfJs();

      let loadingTask;
      if (typeof source === 'string') {
        loadingTask = pdfjs.getDocument({
          url: source,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/cmaps/',
          cMapPacked: true,
        });
      } else if (source instanceof Blob || source instanceof File) {
        const arrayBuffer = await source.arrayBuffer();
        loadingTask = pdfjs.getDocument({
          data: arrayBuffer,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/cmaps/',
          cMapPacked: true,
        });
      } else {
        throw new Error('Unsupported source type for PDF thumbnail generation');
      }

      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      // Determine viewport scale to match targetWidth
      const initialViewport = page.getViewport({ scale: 1.0 });
      const scale = targetWidth / initialViewport.width;
      const viewport = page.getViewport({ scale });

      // Create an offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);

      const canvasContext = canvas.getContext('2d', { alpha: false });
      if (!canvasContext) {
        throw new Error('Could not get 2D canvas context');
      }

      // Draw pure white background in case PDF has transparency
      canvasContext.fillStyle = '#ffffff';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      const renderContext = {
        canvasContext,
        viewport,
        background: 'rgb(255,255,255)',
      };

      await page.render(renderContext).promise;

      // Try webp first, fallback to jpeg if unsupported
      let dataUrl;
      try {
        dataUrl = canvas.toDataURL(format, quality);
        if (!dataUrl.startsWith('data:image/webp') && format === 'image/webp') {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
      } catch {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      if (cacheKey && dataUrl) {
        thumbnailMemoryCache.set(cacheKey, dataUrl);
      }

      return dataUrl;
    } catch (err) {
      console.warn('PDF thumbnail generation warning for', cacheKey, err);
      return null;
    } finally {
      if (cacheKey) {
        inFlightRequests.delete(cacheKey);
      }
    }
  })();

  if (cacheKey) {
    inFlightRequests.set(cacheKey, renderPromise);
  }

  return renderPromise;
}

/**
 * Converts a PDF File or Blob into an image File for uploading to Supabase Storage.
 * @param {File|Blob} pdfFile - Uploaded PDF file
 * @param {string} originalFileName - Original filename for naming the thumbnail
 * @returns {Promise<File|null>}
 */
export async function generateThumbnailFileFromPdf(pdfFile, originalFileName = 'certificate.pdf') {
  try {
    const dataUrl = await getPdfThumbnail(pdfFile, { targetWidth: 800, quality: 0.9, format: 'image/webp' });
    if (!dataUrl) return null;

    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const baseName = originalFileName.replace(/\.pdf$/i, '');
    const thumbFileName = `${baseName}_thumb.webp`;

    return new File([blob], thumbFileName, { type: 'image/webp' });
  } catch (err) {
    console.warn('Failed to generate thumbnail File from PDF:', err);
    return null;
  }
}
