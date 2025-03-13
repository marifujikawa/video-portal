export const isValidVideoUrl = (url: string): boolean => {
  if (!url) return false;
  return url.match(/\.(mp4|m3u8|webm)$/) !== null || url.includes('blob:');
};

export const getVideoType = (url: string): string => {
  if (url.endsWith('.mp4')) return 'video/mp4';
  if (url.endsWith('.m3u8')) return 'application/x-mpegURL';
  if (url.endsWith('.webm')) return 'video/webm';
  return '';
};
