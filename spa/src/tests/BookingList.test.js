import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BookingList } from '../components/BookingList'; 

describe('BookingList', () => {
  jest.setTimeout(10000000000)

  it('renders the booking list correctly', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockReturnValueOnce(
        Promise.resolve({
            json: () =>
                Promise.resolve(  
                    {
                        "arrival_city"
                        : 
                        "Paris",
                        "arrival_time"
                        : 
                        "2023-11-13T15:00:00+02:00",
                        "departure_city"
                        : 
                        "Lviv",
                        "departure_time"
                        : 
                        "2023-11-13T10:00:00+02:00",
                        "id"
                        : 
                        1,
                        "number"
                        : 
                        "35246",
                        "status"
                        : 
                        2
                  }
                ),
        })
    );

    fetchSpy.mockReturnValueOnce(
        Promise.resolve({
            json: () =>
                Promise.resolve(
                    [
                        {
                            "baggage_count": 2,
                            "flight_id": 1,
                            "id": 1,
                            "reservation_time": "2017-07-21 20:32:28+03:00",
                            "user_id": 29
                        }
                    ]
                ),
        })
    );

    fetchSpy.mockReturnValueOnce(
        Promise.resolve({
            json: () =>
                Promise.resolve(
                    
                        {
                            "country"
                            : 
                            "USA",
                            "date_of_birth"
                            : 
                            "1958-04-13",
                            "email"
                            : 
                            "m.anderson1@gmail.com",
                            "id"
                            : 
                            29,
                            "name"
                            : 
                            "Mmmm",
                            "passport_number"
                            : 
                            "RK6544",
                            "role"
                            : 
                            "client",
                            "surname"
                            : 
                            "King"
                        }
                    
                ),
        })
    );
    render(<MemoryRouter><BookingList /></MemoryRouter>);

    // Wait for the fetch request and component rendering
    await screen.findByText('Bookings for flight 35246');

    // Verify the flight list is rendered correctly
    //await new Promise((r) => setTimeout(r, 100));
    expect(screen.getByTestId('table-body')).toBeInTheDocument();
    const tableBody = screen.getByTestId('table-body');
    await waitFor(() => {
        console.log(` ************* rows ${tableBody.rows.length}`)
        if (tableBody.rows.length >= 1) {
            return true;
        }
        throw Error('again!');
      }, { timeout: 1000 * 60 });
    expect(screen.getByText('Mmmm King')).toBeInTheDocument();  
  
    screen.getAllByText('Details').forEach(elm => expect(elm).toBeInTheDocument());
  });
});
