import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Video } from '../../../types';
import { updateLikes, updateViews, validateVideoUrl } from '../../../services/video';
import styles from './VideoDetail.module.css';
import { FaThumbsUp } from 'react-icons/fa';
import VideoDetailSkeleton from '../VideoSkeleton/VideoDetailSkeleton';

interface VideoDetailProps {
  pageProps: {
    video?: {
      data: Video;
    };
  };
}

const VideoDetail: React.FC<VideoDetailProps> = ({ pageProps }) => {
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    console.log('Received pageProps:', pageProps);
    if (pageProps?.video?.data) {
      setVideoData(pageProps.video.data);
      setIsLoading(false);
    } else {
      setError('No video data available');
      setIsLoading(false);
    }
  }, [pageProps]);

  useEffect(() => {
    if (videoData?.id) {
      updateViews(videoData.id);
    }
  }, [videoData?.id]);

  useEffect(() => {
    const validateAndSetUrl = async () => {
      if (!videoData) return;

      const isPrimaryValid = await validateVideoUrl(videoData.url);
      if (isPrimaryValid) {
        setVideoUrl(videoData.url);
        return;
      }

      if (videoData.backupUrl) {
        const isBackupValid = await validateVideoUrl(videoData.backupUrl);
        if (isBackupValid) {
          setVideoUrl(videoData.backupUrl);
          return;
        }
      }

      setVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    };

    validateAndSetUrl();
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

  if (isLoading || !videoData) {
    return <VideoDetailSkeleton />;
  }

  if (error || !videoData) {
    return <div className={styles.error}>Error: {error || 'Video not found'}</div>;
  }

  return (
    <div className={styles.detail}>
      <div className={styles.playerContainer}>
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
            if (videoData?.backupUrl && videoUrl !== videoData.backupUrl) {
              setVideoUrl(videoData.backupUrl);
            }
          }}
        />
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
