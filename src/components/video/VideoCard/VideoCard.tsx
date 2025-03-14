import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { Video } from '../../../types';
import styles from './VideoCard.module.css';
import { motion } from 'framer-motion';

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/video/${video.id}`);
    };

    return (
        <motion.div 
            className={styles.card} 
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
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
        </motion.div>
    );
};

export default memo(VideoCard);