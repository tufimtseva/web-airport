import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import { FlightStatusSetter } from '../components/boardingCheck/FlightStatusSetter';


describe('FlightStatusSetter', () => {
    it('should render the component correctly', () => {
        const flightId = 0;
        const flightStatus = 1;

        const { getByText, getByTestId } = render(
            <FlightStatusSetter flightId={flightId} flightStatus={flightStatus} />
        );

        expect(getByText('Gate opened')).toBeInTheDocument();
        expect(getByTestId('flight-status-selector-dropdown')).toBeInTheDocument();
        expect(getByText('Set flight status')).toBeInTheDocument();
        expect(getByText('Set')).toBeInTheDocument();
    });

    it('should set flight status correctly on selection', async () => {
        const flightId = 1;
        const flightStatus = 0;
        


        global.fetch = jest.fn(url =>
            Promise.resolve({
                json: () =>
                    Promise.resolve(
                        {
                            arrival_city: "Madrid",
                            arrival_time: "2023-10-12T23:32:28+03:00",
                            departure_city: "Amsterdam",
                            departure_time: "2023-10-12T20:32:28+03:00",
                            id: 1,
                            number: "MA2300",
                            status: 1
                        }

                    ),
            })
        );

        // const setFlightStatus = jest.fn();
        // jest
        //   .spyOn(React, 'useState')
        //   .mockImplementationOnce(flightStatus => [flightStatus, setFlightStatus]);
        render(
            <FlightStatusSetter flightId={flightId} flightStatus={flightStatus} />
        );

        const selectElement = screen.getByTestId('flight-status-selector-dropdown');
        //const setFlightStatus = jest.fn();
        const set = screen.getByTestId('set');
        localStorage.setItem("email", "user2@gmail.com");
        localStorage.setItem("password", 12345)
        let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));


        //   await waitFor(() => {
        //       if (selectElement.options.length > 1) {
        //           return true;
        //       }
        //       throw Error('again!');
        //     }, { timeout: 1000 * 60 });

        //   console.log('WAIT DONE');

        await act(async () => {
            fireEvent.change(selectElement, { target: { value: 1 } });
            
            // await waitFor(() => {
            //   expect(setFlightStatus).toHaveBeenCalledWith(1);
              
            // }, { timeout: 1000 * 60 });
            // expect(setFlightStatus).toHaveBeenCalledWith(1);

            // await new Promise((r) => setTimeout(r, 0));

            fireEvent.click(set);
            // await waitFor(() => {
            //     expect(changeStatus).toHaveBeenCalledWith(0);
                
            //   }, { timeout: 1000 * 60 });
            //jest.setTimeout(2000);
        });

        // await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1); // Verify that the fetch function was called
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000//flight/1/public-status', expect.anything()/*{
            method: 'put',
            body: JSON.stringify(
                {
                    status: 1
                }
            ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedCredentials
            }
        }*/);
            //expect(setFlightStatus).toHaveBeenCalledWith(1);
        // });

    });
});