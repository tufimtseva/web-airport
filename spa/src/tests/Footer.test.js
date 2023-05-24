import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer'; 

describe('Footer', () => {
  it('renders the footer content correctly', () => {
    render(<Footer />);

    // Check the contact information
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    const contactInfoRegex = /123 Main Street, Anytown USA, \(555\) 555-5555/;
    expect(screen.getByText(contactInfoRegex)).toBeInTheDocument();
    //expect(screen.getByText('123 Main Street, Anytown USA, (555) 555-5555')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'info@sl.com' })).toBeInTheDocument();

    // Check the follow us section
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'facebook' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'instagram' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'twitter' })).toBeInTheDocument();

    // Check the copyright text
    expect(screen.getByText('© 2023 Silver Lining. All Rights Reserved.')).toBeInTheDocument();
  });
});
