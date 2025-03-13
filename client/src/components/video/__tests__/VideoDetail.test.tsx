import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import VideoDetail from '../VideoDetail';
import { updateLikes } from '../../../services/video';

jest.mock('../../../services/video');

describe('VideoDetail', () => {
  const mockVideo = {
    data: {
      id: 1,
      title: 'Test Video',
      description: 'Test description',
      views: 100,
      likes: 50,
      hasLiked: false,
      url: 'test-url'
    }
  };

  it('renders video details correctly', () => {
    render(<VideoDetail pageProps={{ video: mockVideo }} />);
    
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('100 views')).toBeInTheDocument();
  });

  it('handles like interaction', async () => {
    (updateLikes as jest.Mock).mockResolvedValue({ data: { ...mockVideo.data, hasLiked: true }});

    render(<VideoDetail pageProps={{ video: mockVideo }} />);
    
    fireEvent.click(screen.getByRole('button', { name: /like/i }));

    await waitFor(() => {
      expect(updateLikes).toHaveBeenCalledWith(1);
    });
  });
});
