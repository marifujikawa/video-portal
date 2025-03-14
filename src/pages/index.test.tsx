import { render, screen } from '@testing-library/react';
import { MockNextRouter } from '../test-utils';
import Home from './index';

const mockVideos = {
  data: [
    {
      id: '1',
      title: 'Video 1',
      thumbnail: '/thumbnail1.jpg',
      description: 'Description 1',
      category: '1',
      duration: '5:00'
    },
    {
      id: '2',
      title: 'Video 2',
      thumbnail: '/thumbnail2.jpg',
      description: 'Description 2',
      category: '2',
      duration: '8:00'
    }
  ]
};

describe('Home', () => {
  const renderWithRouter = (ui: React.ReactNode) => {
    return render(
      <MockNextRouter>
        {ui}
      </MockNextRouter>
    );
  };

  it('should render all sections', () => {
    renderWithRouter(<Home initialVideos={mockVideos} />);

    expect(screen.getByText(/continue watching/i)).toBeInTheDocument();
    expect(screen.getByText(/recommended/i)).toBeInTheDocument();
    expect(screen.getByText(/all videos/i)).toBeInTheDocument();
  });

  it('should render video cards with titles', () => {
    renderWithRouter(<Home initialVideos={mockVideos} />);

    expect(screen.getByText(/video 1/i)).toBeInTheDocument();
    expect(screen.getByText(/video 2/i)).toBeInTheDocument();
  });

  it('should have navigation controls', () => {
    renderWithRouter(<Home initialVideos={mockVideos} />);

    const prevButtons = screen.getAllByLabelText(/previous/i);
    const nextButtons = screen.getAllByLabelText(/next/i);
    
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
  });
});
