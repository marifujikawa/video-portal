import React from 'react';
import { useRouter } from 'next/navigation';
import { Video } from '../../types';
import styles from './VideoCard.module.css';

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/video/${video.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.thumbnailContainer}>
                <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className={styles.thumbnail}
                    loading="lazy"
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{video.title}</h3>
                <div className={styles.stats}>
                    <span>{video.views} views</span>
                    <span>{video.likes} likes</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;