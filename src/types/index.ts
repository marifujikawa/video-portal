export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
  likes: number;
  category: string; 
  hasLiked?: boolean;
  backupUrl?: string;
}

export interface VideoListResponse {
  data: Video[];
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
    links: Array<{ url: string | null; label: string; active: boolean }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}