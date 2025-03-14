import axios from 'axios';
import { Video } from '../types';

interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

const api = axios.create({
  baseURL: 'http://localhost:80/api'
});

api.interceptors.request.use(
  config => config,
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

const EXAMPLE_VIDEOS = [
  {
    id: 1,
    title: "Big Buck Bunny",
    category: "1",
    description: "Big Buck Bunny animated short",
    thumbnail: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    backupUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: 1500,
    likes: 200,
    hasLiked: false
  },
  {
    id: 2,
    title: "Elephants Dream",
    category: "1",
    description: "First Blender Open Movie",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Elephants_Dream_s1_05.jpg/320px-Elephants_Dream_s1_05.jpg",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // MP4 direct
    views: 1200,
    likes: 150,
    hasLiked: false
  },
  {
    id: 3,
    title: "Sintel",
    category: "1",
    description: "Third Blender Open Movie",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Sintel_poster.jpg/320px-Sintel_poster.jpg",
    url: "https://test-streams.mux.dev/test.m3u8", // Another HLS stream
    views: 900,
    likes: 100,
    hasLiked: false
  }
];

export const fetchVideos = async (filters: { title?: string, category?: string } = {}) => {
  try {
    let queryParams = '?_page=1&_per_page=100';
    
    if (filters.title) {
      queryParams += `&title_contains=${encodeURIComponent(filters.title)}`;
    }
    
    if (filters.category) {
      queryParams += `&category=${encodeURIComponent(filters.category)}`;
    }
    
    const response = await api.get<PaginatedResponse<Video>>(`/videos${queryParams}`);
    return response.data;
  } catch (error) {
    console.warn('API call failed, using fallback videos:', error);
    
    let filteredVideos = [...EXAMPLE_VIDEOS];
    if (filters.title) {
      const searchTerm = filters.title.toLowerCase();
      filteredVideos = filteredVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm) || 
        video.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      filteredVideos = filteredVideos.filter(video => video.category === filters.category);
    }
    
    return { data: filteredVideos };
  }
};

export const fetchVideo = async (id: string) => {
  try {
    const response = await api.get<Video>(`/videos/${id}`);
    return response;
  } catch (error: any) {
    if (error.response?.status === 404) {
      const fallbackVideo = EXAMPLE_VIDEOS.find(v => v.id === parseInt(id));
      if (fallbackVideo) {
        return { data: fallbackVideo };
      }
      throw new Error('Video not found');
    }
    throw new Error(error.message || 'Failed to fetch video');
  }
};

export const updateLikes = async (id: number) => {
  const response = await api.patch(`/videos/${id}/increment/likes`);
  return response;
};

export const validateVideoUrl = async (url: string): Promise<boolean> => {
  if (!url) return false;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn(`Video URL validation failed for ${url}:`, error);
    return false;
  }
};

export const retryVideoLoad = async (urls: string[]): Promise<string | null> => {
  for (const url of urls) {
    const isValid = await validateVideoUrl(url);
    if (isValid) return url;
  }
  return null;
};