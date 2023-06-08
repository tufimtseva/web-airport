import { render, screen } from '@testing-library/react';
import { Start } from '../components/Start'; 

describe('Start', () => {
  it('renders the start component correctly', () => {
    render(<Start />);
    
    // Assert the greeting heading is rendered with the correct text
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Silver lining aircompany');
    
    // Assert the greeting paragraph is rendered with the correct text
    expect(screen.getByText('We are happy to see you in our team :) Have a nice and productive working day!')).toBeInTheDocument();
    
    // Assert other expectations based on your implementation
  });
  
  // Add more test cases as needed
});
