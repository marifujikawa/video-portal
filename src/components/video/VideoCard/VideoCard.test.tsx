import { render, screen } from '@testing-library/react';
import VideoCard from './VideoCard';

const mockVideo = {
  id: '1',
  title: 'Test Video',
  thumbnail: '/test-thumbnail.jpg',
  description: 'Test description',
  category: '1',
  duration: '10:00'
};

describe('VideoCard', () => {
  it('should render video information correctly', () => {
    render(<VideoCard video={mockVideo} />);

    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
    expect(screen.getByText(mockVideo.duration)).toBeInTheDocument();
  });

  it('should render thumbnail image', () => {
    render(<VideoCard video={mockVideo} />);

    const thumbnail = screen.getByRole('img');
    expect(thumbnail).toHaveAttribute('src', mockVideo.thumbnail);
    expect(thumbnail).toHaveAttribute('alt', mockVideo.title);
  });
});
