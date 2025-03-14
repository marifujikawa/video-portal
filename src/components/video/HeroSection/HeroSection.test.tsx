import { screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import { render } from '@/test-utils';

describe('HeroSection', () => {
  beforeEach(() => {
    // Directly render the component instead of wrapping in waitFor
    render(<HeroSection />);
  });
  
  it('should render correctly', () => {
    expect(screen.getByText('Over the Cast')).toBeInTheDocument();
    expect(screen.getByText(/TikTok como inovação/i)).toBeInTheDocument();
    expect(screen.getByText(/Os principais desafios/i)).toBeInTheDocument();
    expect(screen.getByText('Reproduzir agora')).toBeInTheDocument();
  });

  it('should have a playback button', () => {
    const button = screen.getByRole('button', { name: /reproduzir agora/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
  });
});
