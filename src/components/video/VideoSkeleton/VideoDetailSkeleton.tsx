import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './VideoDetailSkeleton.module.css';

const VideoDetailSkeleton = () => {
  return (
    <div className={styles.detail}>
      <div className={styles.playerContainer}>
        <ContentLoader
          speed={1.2}
          width="100%"
          height="100%"
          viewBox="0 0 1024 576"
          backgroundColor="#2a2a2a"
          foregroundColor="#3a3a3a"
          uniqueKey="player-skeleton"
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
          <circle cx="512" cy="288" r="50" />
          <polygon points="500,265 500,310 535,288" fill="#3a3a3a" />
          <rect x="0" y="540" rx="0" ry="0" width="100%" height="36" />
          <rect x="20" y="557" rx="2" ry="2" width="70%" height="4" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default VideoDetailSkeleton;
