import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import { FlightNumberSelector } from '../components/boardingCheck/FlightNumberSelector'
import { MemoryRouter } from 'react-router-dom';

describe('FlightNumberSelector', () => {
  it('should render the component correctly', () => {
    const setFlightId = jest.fn();
    const setFlightStatus = jest.fn();

    const { getByText, getByTestId } = render(
      <MemoryRouter><FlightNumberSelector setFlightId={setFlightId} setFlightStatus={setFlightStatus} /></MemoryRouter>
    );

    expect(getByText('Select flight')).toBeInTheDocument();
    expect(getByTestId('flight-number-selector-dropdown')).toBeInTheDocument();
    expect(getByText('Get a report')).toBeInTheDocument();
  });

  it('should set the flight ID and status correctly on selection', async () => {
    const setFlightId = jest.fn();

    // let lastSetFlightId = -1;
    // const setFlightId1 = function(flightId) {
    //   lastSetFlightId = flightId;
    // };
    

    waitFor(() => lastSetFlightId == 1)

    const setFlightStatus = jest.fn();
    global.fetch = jest.fn(url =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
                arrival_city: "Madrid",
                arrival_time: "2023-10-12T23:32:28+03:00",
                departure_city: "Amsterdam",
                departure_time: "2023-10-12T20:32:28+03:00",
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

    render(
      <MemoryRouter><FlightNumberSelector setFlightId={setFlightId} setFlightStatus={setFlightStatus} /></MemoryRouter>
    );

    const selectElement = screen.getByTestId('flight-number-selector-dropdown');
    console.log('selectElement ========= ' + selectElement);

    await waitFor(() => {
        if (selectElement.options.length > 1) {
            return true;
        }
        throw Error('again!');
      }, { timeout: 1000 * 60 });

    console.log('WAIT DONE');

    await act(async () => {
      fireEvent.change(selectElement, { target: { value: 1 } });
      await waitFor(() => {
        expect(setFlightId).toHaveBeenCalledWith(1);
        expect(setFlightStatus).toHaveBeenCalledWith(0);
      });
    });
  });
});
