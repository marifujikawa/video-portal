import React, { useState, useRef } from 'react';
import VideoCard from '../VideoCard';
import VideoCardSkeleton from '../VideoSkeleton/VideoCardSkeleton';
import { Video } from '../../../types';
import styles from './VideoList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface VideoListProps {
  initialVideos: Video[];
  category: string;
  isLoading?: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ initialVideos, category, isLoading = false }) => {
  const [videos] = useState<Video[]>(initialVideos);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.section}>
        <h2>{category}</h2>
        <div className={styles.skeletonContainer}>
          {[...Array(4)].map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{category}</h2>
        <div className={styles.scrollButtons}>
          <button onClick={() => handleScroll('left')}>&lt;</button>
          <button onClick={() => handleScroll('right')}>&gt;</button>
        </div>
      </div>
      <div className={styles.videoList} ref={containerRef}>
        <TransitionGroup component={null}>
          {videos.map(video => (
            <CSSTransition
              key={video.id}
              timeout={500}
              classNames="fade"
            >
              <VideoCard video={video} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </section>
  );
};

export default VideoList;