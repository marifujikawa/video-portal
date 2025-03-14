import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Video } from '../../../types';
import { updateLikes, validateVideoUrl, retryVideoLoad } from '../../../services/video';
import styles from './VideoDetail.module.css';
import { FaThumbsUp, FaExclamationTriangle, FaSync } from 'react-icons/fa';
import VideoDetailSkeleton from '../VideoSkeleton/VideoDetailSkeleton';
import { useRouter } from 'next/navigation';

interface VideoDetailProps {
  pageProps: {
    video?: {
      data: Video;
    };
    error?: string;
  };
}

const VideoDetail: React.FC<VideoDetailProps> = ({ pageProps }) => {
  const router = useRouter();
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (pageProps?.error) {
      setError(pageProps.error);
      setIsLoading(false);
      return;
    }

    if (pageProps?.video?.data) {
      setVideoData(pageProps.video.data);
      setIsLoading(false);
    } else {
      setError('No video data available');
      setIsLoading(false);
    }
  }, [pageProps]);

  useEffect(() => {
    const validateAndSetUrl = async () => {
      if (!videoData) return;

      setIsRetrying(true);
      setPlaybackError(null);

      try {
        const urlsToTry = [
          videoData.url,
          videoData.backupUrl,
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        ].filter(Boolean) as string[];

        const validUrl = await retryVideoLoad(urlsToTry);
        
        if (validUrl) {
          setVideoUrl(validUrl);
        } else {
          setPlaybackError('Unable to load video from any source. Please try again later.');
        }
      } catch (err) {
        console.error('Error validating video URLs:', err);
        setPlaybackError('Error loading video. Please try again.');
      } finally {
        setIsRetrying(false);
      }
    };

    if (videoData) {
      validateAndSetUrl();
    }
  }, [videoData]);

  const handleLike = async () => {
    if (!videoData) return;
    
    try {
      const currentLiked = videoData.hasLiked;
      
      setVideoData({
        ...videoData,
        hasLiked: !currentLiked,
        likes: videoData.likes + (currentLiked ? -1 : 1)
      });

      await updateLikes(videoData.id);
    } catch (error) {
      setVideoData({
        ...videoData,
        hasLiked: videoData.hasLiked,
        likes: videoData.likes
      });
      console.error('Error updating likes:', error);
    }
  };

  const handleRetry = () => {
    if (!videoData) return;
    
    setPlaybackError(null);
    setVideoUrl('');
    
    const validateAndSetUrl = async () => {
      setIsRetrying(true);
      
      try {
        const urlsToTry = [
          videoData.url,
          videoData.backupUrl,
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        ].filter(Boolean) as string[];

        const validUrl = await retryVideoLoad(urlsToTry);
        
        if (validUrl) {
          setVideoUrl(validUrl);
        } else {
          setPlaybackError('Unable to load video from any source. Please try again later.');
        }
      } catch (err) {
        console.error('Error validating video URLs:', err);
        setPlaybackError('Error loading video. Please try again.');
      } finally {
        setIsRetrying(false);
      }
    };

    validateAndSetUrl();
  };

  if (isLoading) {
    return <VideoDetailSkeleton />;
  }

  if (error || !videoData) {
    return (
      <div className={styles.errorContainer}>
        <FaExclamationTriangle size={48} />
        <h2>Error</h2>
        <p>{error || 'Video not found'}</p>
        <button 
          className={styles.retryButton}
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.playerContainer}>
        {playbackError ? (
          <div className={styles.playerError}>
            <FaExclamationTriangle size={48} />
            <p>{playbackError}</p>
            <button 
              className={styles.retryButton}
              onClick={handleRetry}
              disabled={isRetrying}
            >
              {isRetrying ? (
                <>
                  <FaSync className={styles.spinIcon} /> Retrying...
                </>
              ) : (
                'Try Again'
              )}
            </button>
          </div>
        ) : !videoUrl ? (
          <div className={styles.playerLoading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading video...</p>
          </div>
        ) : (
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
                forceVideo: true,
                forceHLS: false,
              }
            }}
            onError={(e) => {
              console.error('Video playback error:', e);
              setPlaybackError('Error playing this video. Click to try an alternative source.');
            }}
            className={styles.reactPlayer}
          />
        )}
      </div>
      <div className={styles.info}>
        <h1>{videoData.title}</h1>
        <div className={styles.stats}>
          <span>{videoData.views} views</span>
          <button 
            onClick={handleLike} 
            className={`${styles.likeButton} ${videoData.hasLiked ? styles.liked : ''}`}
          >
            <FaThumbsUp className={styles.thumbIcon} />
            <span>Gostei ({videoData.likes})</span>
          </button>
        </div>
        <p className={styles.description}>{videoData.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
