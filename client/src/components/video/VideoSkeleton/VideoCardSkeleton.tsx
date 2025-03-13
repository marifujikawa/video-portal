import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './VideoCard.module.css';

const VideoCardSkeleton: React.FC = () => (
  <div className={styles.card}>
    <ContentLoader
      speed={2}
      width={280}
      height={300}
      viewBox="0 0 280 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="8" ry="8" width="280" height="157" />
      <rect x="0" y="175" rx="4" ry="4" width="220" height="20" />
      <rect x="0" y="205" rx="3" ry="3" width="140" height="16" />
      <rect x="0" y="235" rx="3" ry="3" width="80" height="16" />
    </ContentLoader>
  </div>
);

export default VideoCardSkeleton;
