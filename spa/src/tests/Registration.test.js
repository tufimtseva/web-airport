import { render, screen, fireEvent } from '@testing-library/react';
import { Registration } from '../components/Registration'; 
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));



describe('Registration', () => {
    beforeEach(() => {
        useNavigate.mockReset();
      });
  it('renders the registration component correctly', () => {
    render(
     <MemoryRouter>
        <Registration />
     </MemoryRouter>
    
   
    );
    
    // Assert the presence of form inputs
    expect(screen.getByLabelText('FirstName')).toBeInTheDocument();
    expect(screen.getByLabelText('LastName')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Passport number')).toBeInTheDocument();
    
    // Assert the presence of the Register button
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    
    // Assert other expectations based on your implementation
  });
  
  it('handles form submission correctly', () => {
    // Mock the fetch function and its response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            "country": "USA",
            "date_of_birth": "1958-04-13",
            "email": "j.valley@gmail.com",
            "id": 34,
            "name": "Jessy",
            "passport_number": "RK6544",
            "password": "pbkdf2:sha256:260000$7KNNhbID3aGhuENZ$39c7cab56cd6e05d3ba6260b37dfc40e210cc618c18b31f29da64b12380155b7",
            "role": "client",
            "surname": "Valley"
        })
      })
    );
    
    render(<Registration />);
    
    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText('FirstName'), { target: { value: 'Jessy' } });
    fireEvent.change(screen.getByLabelText('LastName'), { target: { value: 'Valley' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'j.valley@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText('Birth date'), { target: { value: '1958-04-13' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Passport number'), { target: { value: 'RK6544' } });
    
    // Click the Register button
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    
    // Assert that the fetch function was called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/user', expect.anything());
    
    // Assert other expectations based on your implementation
  });
  
  // Add more test cases as needed
});
