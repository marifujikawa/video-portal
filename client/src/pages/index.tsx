import type { GetServerSideProps, Metadata } from 'next';
import { Video } from '../types';
import { fetchVideos } from '../services/video';
import React, { useRef } from 'react';
import VideoCard from '../components/video/VideoCard/VideoCard';
import styles from '../styles/Home.module.css';
import HeroSection from '../components/video/HeroSection/HeroSection';

interface HomeProps {
  initialVideos: {
    data: Video[];
    meta: {
      current_page: number;
      last_page: number;
      total: number;
    };
  }
}

export const metadata: Metadata = {
  title: 'Video Portal - Home',
  description: 'Watch the best videos in our collection',
  openGraph: {
    title: 'Video Portal - Home',
    description: 'Watch the best videos in our collection',
    type: 'website'
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const videos = await fetchVideos();
    return {
      props: {
        initialVideos: videos
      }
    }
  } catch (error) {
    return {
      props: {
        initialVideos: { data: [], meta: { current_page: 1, last_page: 1, total: 0 } }
      }
    }
  }
}

export default function Home({ initialVideos }: HomeProps) {
  const continuarRef = useRef<HTMLDivElement>(null);
  const aoVivoRef = useRef<HTMLDivElement>(null);
  const minhaListaRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <HeroSection />
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Continuar reprodução</h2>
          <div className={styles.scrollButtons}>
            <span className={styles.seeMore}>Veja mais</span>
            <button onClick={() => scroll(continuarRef, 'left')}>&lt;</button>
            <button onClick={() => scroll(continuarRef, 'right')}>&gt;</button>
          </div>
        </div>
        <div className={styles.videoList} ref={continuarRef}>
          {initialVideos.data.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Ao vivo</h2>
          <div className={styles.scrollButtons}>
            <span className={styles.seeMore}>Veja mais</span>
            <button onClick={() => scroll(aoVivoRef, 'left')}>&lt;</button>
            <button onClick={() => scroll(aoVivoRef, 'right')}>&gt;</button>
          </div>
        </div>
        <div className={styles.videoList} ref={aoVivoRef}>
          {initialVideos.data.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Minha lista</h2>
          <div className={styles.scrollButtons}>
            <span className={styles.seeMore}>Veja mais</span>
            <button onClick={() => scroll(minhaListaRef, 'left')}>&lt;</button>
            <button onClick={() => scroll(minhaListaRef, 'right')}>&gt;</button>
          </div>
        </div>
        <div className={styles.videoList} ref={minhaListaRef}>
          {initialVideos.data.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
