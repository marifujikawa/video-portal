import { screen } from '@testing-library/react';
import VideoCard from './VideoCard';
import { Video } from '@/types';
import { render } from '@/test-utils';

// Mock the Next.js navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    route: '/',
  }),
}));

const mockVideo: Video = {
  id: 1,
  title: 'Video 1',
  thumbnail: '/thumbnail1.jpg',
  description: 'Description 1',
  category: '1',
  url: '',
  views: 100,
  likes: 50
};

describe('VideoCard', () => {
  beforeEach(() => {
    render(<VideoCard video={mockVideo} />);
  });

  it('should render video information correctly', () => {
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
  });

  it('should render thumbnail image', () => {
    const thumbnail = screen.getByRole('img');
    expect(thumbnail).toHaveAttribute('src', mockVideo.thumbnail);
    expect(thumbnail).toHaveAttribute('alt', mockVideo.title);
  });
  
  it('should display the correct view count', () => {
    expect(screen.getByText(`${mockVideo.views} views`)).toBeInTheDocument();
  });

  it('should display the correct like count', () => {
    expect(screen.getByText(`${mockVideo.likes} likes`)).toBeInTheDocument();
  });
});
