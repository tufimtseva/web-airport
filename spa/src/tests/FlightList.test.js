import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { FlightList } from '../components/FlightList'; 

describe('FlightList', () => {
  jest.setTimeout(10000000000)

  it('renders the flight list correctly', async () => {
    global.fetch = jest.fn(url =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                  arrival_city: "Madrid",
                  arrival_time: "2023-10-12T23:32:28+04:00",
                  departure_city: "Amsterdam",
                  departure_time: "2023-10-12T20:32:28+04:00",
                  id: 1,
                  number: "MA2300",
                  status: 0
                },
                {
                  arrival_city: "London",
                  arrival_time: "2023-10-12T23:32:28+03:00",
                  departure_city: "Amsterdam",
                  departure_time: "2023-10-12T20:32:28+03:00",
                  id: 2,
                  number: "Lo2300",
                  status: 1
                }
            ]),
        })
      );
    render(<MemoryRouter><FlightList /></MemoryRouter>);

    // Wait for the fetch request and component rendering
    await screen.findByText('All flights');

    // Verify the flight list is rendered correctly
    //await new Promise((r) => setTimeout(r, 100));
    expect(screen.getByTestId('table-body')).toBeInTheDocument();
    const tableBody = screen.getByTestId('table-body');
    await waitFor(() => {
        console.log(` ************* rows ${tableBody.rows.length}`)
        if (tableBody.rows.length > 1) {
            return true;
        }
        throw Error('again!');
      }, { timeout: 1000 * 60 });
    expect(screen.getByText('2023-10-12T20:32:28+03:00')).toBeInTheDocument();  
    expect(screen.getByText('Created')).toBeInTheDocument();
    screen.getAllByText('Bookings').forEach(elm => expect(elm).toBeInTheDocument());
    screen.getAllByText('Details').forEach(elm => expect(elm).toBeInTheDocument());

   
    expect(screen.getByText('Planned')).toBeInTheDocument();
   

    expect(screen.getByText('Lo2300')).toBeInTheDocument();
   
    
 


  });
});
