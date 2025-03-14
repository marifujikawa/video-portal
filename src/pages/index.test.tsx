import { render, screen, waitFor } from '@testing-library/react';
// import { render } from '../test-utils';
import Home, { HomeProps } from './index';
import { Video } from '@/types';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    route: '/',
  }),
}));

const data: Video[] = [
  {
    id: 1,
    title: 'Video 1',
    thumbnail: '/thumbnail1.jpg',
    description: 'Description 1',
    category: '1',
    url: '',
    views: 0,
    likes: 0
  } as Video,
  {
    id: 2,
    title: 'Video 2',
    thumbnail: '/thumbnail1.jpg',
    description: 'Description 2',
    category: '2',
    url: '',
    views: 0,
    likes: 0
  },
]

const mockInitialVideos: HomeProps = {
  initialVideos: {
    data,
    meta: {
      current_page: 1,
      last_page: 1,
      total: 1
    }
  }
};

describe('Home', () => {
  beforeEach(() => {
    render(<Home {...mockInitialVideos} />);
  });
  it('should render all sections', () => {

    expect(screen.getByText('Continuar reprodução')).toBeInTheDocument();
    expect(screen.getByText('Ao vivo')).toBeInTheDocument();
    expect(screen.getByText('Minha lista')).toBeInTheDocument();
  });

  it('should render video cards with titles', () => {
    expect(screen.getByText(/video 1/i)).toBeInTheDocument();
    expect(screen.getByText(/video 2/i)).toBeInTheDocument();
  });

  it('should have navigation controls', () => {
    const prevButtons = screen.getAllByText('<');
    const nextButtons = screen.getAllByText('>');

    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
  });
});
