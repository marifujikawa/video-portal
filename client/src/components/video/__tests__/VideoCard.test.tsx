import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import VideoCard from '../VideoCard';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('VideoCard', () => {
  const mockVideo = {
    id: 1,
    title: 'Test Video',
    thumbnail: 'test.jpg',
    views: 100,
    likes: 50,
    description: 'Test description',
    url: 'test-url'
  };

  it('renders video information correctly', () => {
    render(<VideoCard video={mockVideo} />);
    
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('100 views')).toBeInTheDocument();
    expect(screen.getByText('50 likes')).toBeInTheDocument();
  });

  it('navigates to video detail page on click', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<VideoCard video={mockVideo} />);
    fireEvent.click(screen.getByRole('article'));

    expect(mockPush).toHaveBeenCalledWith('/video/1');
  });
});
