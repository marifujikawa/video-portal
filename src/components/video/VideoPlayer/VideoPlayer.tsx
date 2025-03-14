import { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { isValidVideoUrl, getVideoType } from '@/utils/videoUtils';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    if (!isValidVideoUrl(videoUrl)) {
      setError('Invalid video URL format');
      return;
    }

    let hls: Hls | null = null;

    const initializeVideo = async () => {
      try {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (videoUrl.endsWith('.m3u8')) {
          if (Hls.isSupported()) {
            hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
            });
            hls.loadSource(videoUrl);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              videoElement.play().catch(e => console.log('Playback prevented:', e));
            });
          } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = videoUrl;
          }
        } else {
          videoElement.src = videoUrl;
        }
      } catch (err) {
        setError('Error loading video');
        console.error('Video loading error:', err);
      }
    };

    initializeVideo();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <div className={styles.videoPlayerWrapper}>
      {error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <video
          ref={videoRef}
          controls
          className={styles.videoPlayer}
          playsInline
          poster={videoUrl.replace(/\.(mp4|m3u8|webm)$/, '.jpg')}
        >
          <source src={videoUrl} type={getVideoType(videoUrl)} />
          <p>Your browser does not support HTML5 video.</p>
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;