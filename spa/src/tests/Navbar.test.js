import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar'; 

// Mock useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Mock the useLocation value
    useLocation.mockReturnValue({ pathname: '/' });
  });

  it('renders the navbar correctly when on home page', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Assert the logo link is rendered with the correct text and path
    expect(screen.getByText('SL')).toHaveAttribute('href', '/');
    // Assert other expectations based on your implementation
  });

  it('renders the navbar correctly when not on home page', () => {
    useLocation.mockReturnValue({ pathname: '/boardingcheck' });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Assert the logo link is rendered with the correct text and path
    expect(screen.getByText('SL')).toHaveAttribute('href', '/boardingcheck');
    // Assert other expectations based on your implementation
  });

  // Add more test cases as needed for different scenarios
});
