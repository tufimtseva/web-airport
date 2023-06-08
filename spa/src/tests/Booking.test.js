import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Booking } from '../components/Booking';

describe('Flight', () => {
    jest.setTimeout(10000000000)

    it('renders the booking list correctly', async () => {
        const fetchSpy = jest.spyOn(global, 'fetch');
        fetchSpy.mockReturnValueOnce(
            Promise.resolve({
                json: () =>
                    Promise.resolve(
                        {
                            "baggage_count": 2,
                            "flight_id": 1,
                            "id": 1,
                            "reservation_time": "2017-07-21T20:32:28+03:00",
                            "user_id": 29
                        }

                    ),
            })
        );

        fetchSpy.mockReturnValueOnce(
            Promise.resolve({
                json: () =>
                    Promise.resolve(
                        {
                            "arrival_city": "Paris",
                            "arrival_time": "2023-11-13T15:00:00+02:00",
                            "departure_city": "Lviv",
                            "departure_time": "2023-11-13T10:00:00+02:00",
                            "id": 1,
                            "number": "35246",
                            "status": 2
                        }


                    ),
            })
        );
        render(<MemoryRouter><Booking /></MemoryRouter>);

        await screen.findByText('Booking');
        await screen.findByText('Booking details');

        await waitFor(() => {
            expect(screen.getByText('2017-07-21T20:32:28+03:00')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('35246')).toBeInTheDocument();
        })
    });
});
