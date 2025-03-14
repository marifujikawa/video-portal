import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './VideoCardSkeleton.module.css';

const VideoCardSkeleton: React.FC = () => (
  <div className={styles.card}>
    <div className={styles.thumbnailContainer}>
      <ContentLoader
        speed={1.5}
        width="100%"
        height="100%"
        viewBox="0 0 300 150"
        backgroundColor="#333"
        foregroundColor="#444"
      >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        <rect x="250" y="120" rx="2" ry="2" width="40" height="20" />
        <circle cx="150" cy="75" r="20" />
      </ContentLoader>
    </div>
    
    <div className={styles.info}>
      <ContentLoader
        speed={1.5}
        width="100%"
        height="50"
        viewBox="0 0 300 50"
        backgroundColor="#333"
        foregroundColor="#444"
      >
        <rect x="0" y="0" rx="3" ry="3" width="90%" height="18" />

        <rect x="0" y="30" rx="2" ry="2" width="40%" height="12" />
        <rect x="200" y="30" rx="2" ry="2" width="30%" height="12" />
      </ContentLoader>
    </div>
  </div>
);

export default VideoCardSkeleton;
