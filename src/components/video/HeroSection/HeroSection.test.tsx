import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('should render correctly', () => {
    render(<HeroSection />);
    
    expect(screen.getByText('Over the Cast')).toBeInTheDocument();
    expect(screen.getByText(/TikTok como inovação/i)).toBeInTheDocument();
    expect(screen.getByText(/Os principais desafios/i)).toBeInTheDocument();
    expect(screen.getByText('Reproduzir agora')).toBeInTheDocument();
  });

  it('should have a playback button', () => {
    render(<HeroSection />);
    
    const button = screen.getByRole('button', { name: /reproduzir agora/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
  });
});
