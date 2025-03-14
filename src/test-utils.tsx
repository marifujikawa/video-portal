import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

export function createMockRouter() {
  return {
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  };
}

export function MockNextRouter({ children }: { children: React.ReactNode }) {
  const mockRouter = createMockRouter();
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  return <>{children}</>;
}
