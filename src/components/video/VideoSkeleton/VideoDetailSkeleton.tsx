import ContentLoader from 'react-content-loader';
import styles from '../VideoDetail/VideoDetail.module.css';

const VideoDetailSkeleton = () => {
  // Use fixed unique IDs for each content loader
  return (
    <div className={styles.detail}>
      <div className={styles.playerContainer}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 800 400"
          backgroundColor="#1a1a1a"
          foregroundColor="#262626"
          uniqueKey="player-skeleton"
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </ContentLoader>
      </div>

      <div className={styles.info}>
        <ContentLoader
          speed={2}
          width="100%"
          height={200}
          viewBox="0 0 800 200"
          backgroundColor="#1a1a1a"
          foregroundColor="#262626"
          uniqueKey="info-skeleton"
        >
          <rect x="0" y="0" rx="4" ry="4" width="600" height="32" />
          <rect x="0" y="50" rx="4" ry="4" width="100" height="24" />
          <rect x="0" y="90" rx="4" ry="4" width="800" height="80" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default VideoDetailSkeleton;
