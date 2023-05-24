import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ManagerProfile } from '../components/ManagerProfile'; 

describe('ManagerProfile', () => {
  jest.setTimeout(10000000000)

  it('renders the client list correctly', async () => {
    global.fetch = jest.fn(url =>
        Promise.resolve({
          json: () =>
            Promise.resolve(
                {
                    "country": "USA",
                    "date_of_birth": "1958-04-13",
                    "email": "j.valley@gmail.com",
                    "id": 34,
                    "name": "Jessy",
                    "passport_number": "RK6544",
                    "password": "pbkdf2:sha256:260000$7KNNhbID3aGhuENZ$39c7cab56cd6e05d3ba6260b37dfc40e210cc618c18b31f29da64b12380155b7",
                    "role": "manager",
                    "surname": "Valley"
                }

            ),
        })
      );
    localStorage.setItem("id", 34)
    render(<MemoryRouter><ManagerProfile /></MemoryRouter>);

    // Wait for the fetch request and component rendering
    await screen.findByText('Personal Information');



    await waitFor(() => {
        expect(screen.getByText('j.valley@gmail.com')).toBeInTheDocument();
    })
    

   
    
 


  });
});
