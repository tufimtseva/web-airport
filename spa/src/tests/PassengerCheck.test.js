import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import { PassengerCheck } from '../components/boardingCheck/PassengerCheck';
// import fetchMock from 'jest-fetch-mock';

// jest.mock('node-fetch');

// beforeEach(() => {
//   fetchMock.resetMocks();
// });
describe('PassengerCheck', () => {
    it('should search for user and booking, and add boarding check', async () => {
        localStorage.setItem("email", "user2@gmail.com");
        localStorage.setItem("password", 12345)
        // Mock the fetch responses





        /*
      global.fetch = jest.fn(url =>
          Promise.resolve({
              json: () =>
                Promise.resolve([
                    {
                        "country": "USA",
                        "date_of_birth": "1958-04-13",
                        "email": "m.anderson1@gmail.com",
                        "id": 29,
                        "name": "Mmmm",
                        "passport_number": "RK6544",
                        "password": "pbkdf2:sha256:260000$pmjbSYAl8GiH2Bc8$ede49fa56be30d2a1125e00f340bf13fd70cdb15fab9c197ae9b4eece9eef0a7",
                        "role": "client",
                        "surname": "King"
                    },
                    {
                        "country": "USA",
                        "date_of_birth": "1958-04-13",
                        "email": "m.donnovan@gmail.com",
                        "id": 31,
                        "name": "Ann",
                        "passport_number": "RK6544",
                        "password": "pbkdf2:sha256:260000$QKNgbxaJWOfiFBBp$0d61275b8392ea5b50d0c7dd1e7ca64c08280d6c432e736668fcc321144bfbdd",
                        "role": "client",
                        "surname": "Donnowan"
                    },
                    {
                        "country": "USA",
                        "date_of_birth": "1958-04-13",
                        "email": "d.greay@gmail.com",
                        "id": 32,
                        "name": "Darcy",
                        "passport_number": "RK6544",
                        "password": "pbkdf2:sha256:260000$MezTxNEQSWGJSIYc$ed2431f5722a3202b868471a25819177fad4f7486ed961ba2f12996c3e2e2af6",
                        "role": "client",
                        "surname": "Grey"
                    },
                    {
                        "country": "USA",
                        "date_of_birth": "1958-04-13",
                        "email": "b.royal@gmail.com",
                        "id": 33,
                        "name": "Bob",
                        "passport_number": "RK6544",
                        "password": "pbkdf2:sha256:260000$DyViHnYBX0HA0iZP$5b1f5d3a2859ac51b73a308fea018618b707cae39033091fc704443870e76273",
                        "role": "client",
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
                        "role": "client",
                        "surname": "Valley"
                    }
                ]),
            })
      );
      */

        //*
        const fetchSpy = jest.spyOn(global, 'fetch');
        fetchSpy.mockReturnValueOnce(
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            "country": "USA",
                            "date_of_birth": "1958-04-13",
                            "email": "m.anderson1@gmail.com",
                            "id": 29,
                            "name": "Mmmm",
                            "passport_number": "RK6544",
                            "password": "pbkdf2:sha256:260000$pmjbSYAl8GiH2Bc8$ede49fa56be30d2a1125e00f340bf13fd70cdb15fab9c197ae9b4eece9eef0a7",
                            "role": "client",
                            "surname": "King"
                        },
                        {
                            "country": "USA",
                            "date_of_birth": "1958-04-13",
                            "email": "m.donnovan@gmail.com",
                            "id": 31,
                            "name": "Ann",
                            "passport_number": "RK6544",
                            "password": "pbkdf2:sha256:260000$QKNgbxaJWOfiFBBp$0d61275b8392ea5b50d0c7dd1e7ca64c08280d6c432e736668fcc321144bfbdd",
                            "role": "client",
                            "surname": "Donnowan"
                        },
                        {
                            "country": "USA",
                            "date_of_birth": "1958-04-13",
                            "email": "d.greay@gmail.com",
                            "id": 32,
                            "name": "Darcy",
                            "passport_number": "RK6544",
                            "password": "pbkdf2:sha256:260000$MezTxNEQSWGJSIYc$ed2431f5722a3202b868471a25819177fad4f7486ed961ba2f12996c3e2e2af6",
                            "role": "client",
                            "surname": "Grey"
                        },
                        {
                            "country": "USA",
                            "date_of_birth": "1958-04-13",
                            "email": "b.royal@gmail.com",
                            "id": 33,
                            "name": "Bob",
                            "passport_number": "RK6544",
                            "password": "pbkdf2:sha256:260000$DyViHnYBX0HA0iZP$5b1f5d3a2859ac51b73a308fea018618b707cae39033091fc704443870e76273",
                            "role": "client",
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
                            "role": "client",
                            "surname": "Valley"
                        }
                    ]),
            })
        );

        fetchSpy.mockReturnValueOnce(
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            "baggage_count": 2,
                            "flight_id": 2,
                            "id": 2,
                            "reservation_time": "2017-07-21 20:32:28+03:00",
                            "user_id": 29
                        },
                        {
                            "baggage_count": 2,
                            "flight_id": 2,
                            "id": 3,
                            "reservation_time": "2017-07-21 20:32:28+03:00",
                            "user_id": 31
                        },
                        {
                            "baggage_count": 2,
                            "flight_id": 2,
                            "id": 4,
                            "reservation_time": "2017-07-21 20:32:28+03:00",
                            "user_id": 32
                        },
                        {
                            "baggage_count": 2,
                            "flight_id": 2,
                            "id": 5,
                            "reservation_time": "2017-07-21 20:32:28+03:00",
                            "user_id": 33
                        },
                        {
                            "baggage_count": 2,
                            "flight_id": 2,
                            "id": 6,
                            "reservation_time": "2017-07-21 20:32:28+03:00",
                            "user_id": 34
                        }
                    ]),
            })
        );
        //*/

        // Render your component
        const { getByPlaceholderText, getByTestId, getByText } = render(<PassengerCheck flightId={2} />);

        // expect(fetchSpy).toHaveBeenCalledTimes(1);
        // expect(fetchMock.mock.calls.length).toBe(1);
        // Simulate user interaction to search for a passenger
        const nameInput = getByPlaceholderText('Name');
        const surnameInput = getByPlaceholderText('Surname');
        const passportInput = getByPlaceholderText('Passport number');
        const searchButton = screen.getByTestId('search');

        await waitFor(() => expect(passportInput.disabled).toBeFalsy());

        // await waitFor(() => {
        //     expect(fetch).toHaveBeenCalledTimes(1);
        //     }); 




        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Mary' } });
            fireEvent.change(surnameInput, { target: { value: 'King' } });
            fireEvent.change(passportInput, { target: { value: 'RK6544' } });
            fireEvent.click(searchButton);
        })

        expect(fetchSpy).toHaveBeenCalledTimes(2);

        //await new Promise((r) => setTimeout(r, 0));
        await waitFor(() => {
            //   expect(fetch).toHaveBeenCalledTimes(1);
            //expect(fetchSpy).toHaveBeenCalledTimes(2); // Verify the number of fetch calls
            //expect(fetchMock.mock.calls.length).toBe(2);
            // Assert expectations for the first fetch call
            expect(fetchSpy.mock.calls[0][0]).toBe('http://localhost:5000//flight/2/user');
            expect(fetchSpy.mock.calls[0][1].headers).toEqual({
                Authorization: expect.stringContaining('Basic '),
            });

            // Assert expectations for the second fetch call
            expect(fetchSpy.mock.calls[1][0]).toBe('http://localhost:5000//flight/2/booking');
            expect(fetchSpy.mock.calls[1][1].headers).toEqual({
                Authorization: expect.stringContaining('Basic '),
            });
        });



        //   expect(fetch).toHaveBeenCalledWith('http://localhost:5000//flight/2/booking', {
        //     method: 'get',
        //     headers: {
        //       Authorization: expect.stringContaining('Basic '),
        //     },
        //   });


          const checkTypeSelector = getByTestId('check-type-selector');
          await act(async () => {
            fireEvent.change(checkTypeSelector, { target: { value: 1 } }); // Select check type
            fireEvent.click(getByText('Success')); // Click "Success" button
          });


        // Wait for the fetch request and state updates
        // await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(3); // Verify that fetch was called for adding boarding check

        expect(fetchSpy.mock.calls[2][0]).toBe('http://localhost:5000//boarding-check');

        // Assert other expectations about the updated state or UI changes
        // ...
        // });
        //   });
    });

})

