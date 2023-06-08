import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ManagerList } from '../components/ManagerList'; 

describe('ManagerList', () => {
  jest.setTimeout(10000000000)

  it('renders the manager list correctly', async () => {
    global.fetch = jest.fn(url =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
                {
                    "country": "USA",
                    "date_of_birth": "1958-04-13",
                    "email": "b.royal@gmail.com",
                    "id": 33,
                    "name": "Bob",
                    "passport_number": "RK6544",
                    "password": "pbkdf2:sha256:260000$DyViHnYBX0HA0iZP$5b1f5d3a2859ac51b73a308fea018618b707cae39033091fc704443870e76273",
                    "role": "manager",
                    "surname": "Royal"
                },
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
            ]),
        })
      );
    render(<MemoryRouter><ManagerList /></MemoryRouter>);

    // Wait for the fetch request and component rendering
    await screen.findByText('Managers');

    // Verify the flight list is rendered correctly
    //await new Promise((r) => setTimeout(r, 100));
    expect(screen.getByTestId('container')).toBeInTheDocument();
    const tableBody = screen.getByTestId('container');
    await waitFor(() => {
        //console.log(` ************* rows ${tableBody.rows.length}`)
        if (tableBody.children.length > 1) {
            return true;
        }
        throw Error('again!');
      }, { timeout: 1000 * 60 });
    expect(screen.getByText('j.valley@gmail.com')).toBeInTheDocument();  
    expect(screen.getByText('b.royal@gmail.com')).toBeInTheDocument();
   
    
    //screen.getAllByText('Details').forEach(elm => expect(elm).toBeInTheDocument());

   
    
 


  });
});
