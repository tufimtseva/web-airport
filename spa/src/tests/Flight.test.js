import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Flight } from '../components/Flight'; 

describe('Flight', () => {
  jest.setTimeout(10000000000)

  it('renders the client list correctly', async () => {
    global.fetch = jest.fn(url =>
        Promise.resolve({
          json: () =>
            Promise.resolve(
                {
                    arrival_city: "Madrid",
                    arrival_time: "2023-10-12T23:32:28+04:00",
                    departure_city: "Amsterdam",
                    departure_time: "2023-11-12T20:32:28+04:00",
                    id: 1,
                    number: "MA2300",
                    status: 0
                  }

            ),
        })
      );
    render(<MemoryRouter><Flight /></MemoryRouter>);

    // Wait for the fetch request and component rendering
    await screen.findByText('Flight info');



    await waitFor(() => {
        expect(screen.getByText('MA2300')).toBeInTheDocument();
        //expect(screen.getByText('2023-11-12T20:32:28+04:00')).toBeInTheDocument();
        expect(screen.getByText('Created')).toBeInTheDocument();
        expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    })
    

   
    
 


  });
});
