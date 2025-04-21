/**
 * Utility functions for handling image URLs
 */

/**
 * Convert a Google Drive sharing URL to a direct image URL
 * Supports both folder and file URLs
 */
export const getGoogleDriveDirectUrl = (url: string): string => {
  if (!url) return url;

  // Extract file ID from various Google Drive URL formats
  let fileId: string | null = null;

  // Handle folder view URLs
  const folderViewRegex = /https:\/\/drive\.google\.com\/drive\/folders\/([^?]+)/;
  const folderMatch = url.match(folderViewRegex);
  if (folderMatch) {
    fileId = folderMatch[1];
  }

  // Handle file view URLs
  const fileViewRegex = /https:\/\/drive\.google\.com\/file\/d\/([^/]+)/;
  const fileMatch = url.match(fileViewRegex);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Handle direct uc URLs
  const ucRegex = /https:\/\/drive\.google\.com\/uc\?.*id=([^&]+)/;
  const ucMatch = url.match(ucRegex);
  if (ucMatch) {
    fileId = ucMatch[1];
  }

  // If we found a file ID, return the proper format
  if (fileId) {
    // This format works better with CORS
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return url;
};

/**
 * Check if a URL is a Google Drive URL
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return url.includes('drive.google.com');
};

/**
 * Get the file ID from a Google Drive URL
 */
export const getGoogleDriveFileId = (url: string): string | null => {
  // Handle file view URLs
  const fileViewRegex = /https:\/\/drive\.google\.com\/file\/d\/([^/]+)/;
  const fileMatch = url.match(fileViewRegex);
  if (fileMatch) {
    return fileMatch[1];
  }

  // Handle direct uc URLs
  const ucRegex = /https:\/\/drive\.google\.com\/uc\?.*id=([^&]+)/;
  const ucMatch = url.match(ucRegex);
  if (ucMatch) {
    return ucMatch[1];
  }

  // Handle thumbnail URLs
  const thumbnailRegex = /https:\/\/drive\.google\.com\/thumbnail\?id=([^&]+)/;
  const thumbnailMatch = url.match(thumbnailRegex);
  if (thumbnailMatch) {
    return thumbnailMatch[1];
  }

  return null;
};

/**
 * Generate a thumbnail URL for a Google Drive image
 * @param fileId The Google Drive file ID
 * @param size The desired width in pixels or a preset size ('s', 'm', 'l')
 */
export const getGoogleDriveThumbnail = (fileId: string, size: number | 's' | 'm' | 'l' = 'm'): string => {
  if (typeof size === 'number') {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  }
  
  // Map preset sizes to actual widths
  const sizeMap = {
    's': 'w200',
    'm': 'w400',
    'l': 'w1000'
  };
  
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sizeMap[size]}`;
};

/**
 * Example usage:
 * 
 * // Convert a sharing URL to a direct URL
 * const directUrl = getGoogleDriveDirectUrl('https://drive.google.com/file/d/YOUR_FILE_ID/view');
 * 
 * // Get a thumbnail with specific width
 * const thumbnailUrl = getGoogleDriveThumbnail('YOUR_FILE_ID', 800);
 * 
 * // Get a thumbnail with preset size
 * const largeThumbnail = getGoogleDriveThumbnail('YOUR_FILE_ID', 'l');
 */ 