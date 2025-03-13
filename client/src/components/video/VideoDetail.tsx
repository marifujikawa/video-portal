import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import ContentLoader from 'react-content-loader';
import { Video } from '../../types';
import { updateLikes } from '../../services/video';
import styles from './VideoDetail.module.css';
import { FaThumbsUp } from 'react-icons/fa';

interface VideoDetailProps {
  pageProps: {
    video: {
      data: Video;
    };
  };
}

const VideoDetailSkeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={800}
        height={400}
        viewBox="0 0 800 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="0" ry="0" width="800" height="400" />
    </ContentLoader>
);

const VideoDetail: React.FC<VideoDetailProps> = ({ pageProps }) => {
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleLike = async () => {
    if (!videoData) return;
    
    try {
      const currentLiked = videoData.hasLiked;
      
      setVideoData({
        ...videoData,
        hasLiked: !currentLiked
      });

      await updateLikes(videoData.id);
    } catch (error) {
      setVideoData({
        ...videoData,
        hasLiked: videoData.hasLiked
      });
      console.error('Error updating likes:', error);
    }
  };

  if (isLoading) {
    return <VideoDetailSkeleton />;
  }

  if (error || !videoData) {
    return <div className={styles.error}>Error: {error || 'Video not found'}</div>;
  }

  return (
    <div className={styles.detail}>
      <div className={styles.playerContainer}>
        <ReactPlayer
          url={videoData.url}
          controls
          width="100%"
          height="100%"
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
            <span>Gostei</span>
          </button>
        </div>
        <p className={styles.description}>{videoData.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
