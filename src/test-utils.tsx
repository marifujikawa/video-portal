import { render as rtlRender, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import React from 'react'

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
}

// Mock the router module
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}))

// AppRouterContext provider mock
const AppRouterContext = React.createContext({
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
})

// Create a wrapper component that provides the router context
function RouterWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterContext.Provider value={mockRouter as any}>
      {children}
    </AppRouterContext.Provider>
  )
}

function render(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(ui, { 
    wrapper: ({ children }) => <RouterWrapper>{children}</RouterWrapper>, 
    ...options 
  })
}

export { render, mockRouter }
export * from '@testing-library/react'
