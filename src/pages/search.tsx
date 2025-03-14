import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Video } from '../types';
import { fetchVideos } from '../services/video';
import VideoCard from '../components/video/VideoCard/VideoCard';
import styles from '../styles/Search.module.css';

interface SearchPageProps {
  initialVideos: {
    data: Video[];
    meta?: {
      current_page: number;
      last_page: number;
      total: number;
    };
  };
  searchTerm: string;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const searchTerm = query.q as string || '';
    const videos = await fetchVideos({ title: searchTerm });
    
    return {
      props: {
        initialVideos: videos,
        searchTerm
      }
    };
  } catch (error) {
    console.error('Search page error:', error);
    return {
      props: {
        initialVideos: { data: [] },
        searchTerm: query.q || '',
        error: 'Failed to fetch videos'
      }
    };
  }
};

const SearchPage = ({ initialVideos, searchTerm }: SearchPageProps) => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>(initialVideos.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const query = router.query.q as string;
        const results = await fetchVideos({ title: query });
        setVideos(results.data);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (router.query.q !== searchTerm) {
      fetchSearchResults();
    }
  }, [router.query.q, searchTerm]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Resultados para: <span className={styles.searchTerm}>{router.query.q || searchTerm}</span>
      </h1>
      
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Carregando resultados...</p>
        </div>
      )}
      
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => router.reload()}>Tentar novamente</button>
        </div>
      )}
      
      {!isLoading && !error && videos.length === 0 && (
        <div className={styles.noResults}>
          <p>Não encontramos resultados para sua busca.</p>
          <p>Tente diferentes palavras-chave ou navegue pelas categorias.</p>
        </div>
      )}
      
      <div className={styles.results}>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
