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

export const fetchVideos = async () => {
  try {
    const response = await api.get<PaginatedResponse<Video>>('/videos?_page=1&_per_page=100');
    return response.data;
  } catch (error) {
    console.warn('API call failed, using fallback videos:', error);
    return { data: EXAMPLE_VIDEOS };
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
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};