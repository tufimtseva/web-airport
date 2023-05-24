import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
export const BookingList = function () {
    return <></>
}
/*
export const BookingList = function () {
    const [bookingData, setBookingData] = useState([]);
    const [fullnmaes, setFullNames] = useState([]);
    const [flightNumber, setFlightNumber] = useState(-1);
    const [searchParams] = useSearchParams();
    // const params = new URLSearchParams(window.location.pathname);

    const flightId = searchParams.get('flightid');
    let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));
    useEffect(() => {
        fetch(`http://localhost:5000/flight/${flightId}`, {
            method: 'GET'
        })
            .catch(e => {
                throw new Error('Service unreachable')
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.code >= 300) {
                    throw new Error(jsonResponse.msg)
                } else {
                    //   console.log(JSON.stringify(jsonResponse));
                    let flight_number = jsonResponse["number"];
                    setFlightNumber(flight_number);

                }
            })
            .catch(e => {
                alert(e.message)
            });


        // fetch(`http://localhost:5000/flight/${flightId}/booking`, {})
        //     .catch()
        //     .then(response => response.json())
        //     .then(jsonResponse => {
        //         const subRequests = [];
        //         jsonResponse.map(booking => {
        //             const subRequest = fetch(`http://localhost:5000/user/${booking["user_id"]}`, {})
        //                 .then();
        //             subRequests.push(subRequest);
        //         });
        //         return Promise.all(subRequests);
        //     })
        //     .then(abc => {
        //         setBookingData(bookingJSON);
        //     });


       
       fetch(`http://localhost:5000/flight/${flightId}/booking`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedCredentials
            }
        })
            .catch(e => {
                throw new Error('Service unreachable')
            })
            .then(response => response.json())
            .then(jsonResponse => {

                if (jsonResponse.code >= 300) {
                    throw new Error(jsonResponse.msg)
                } else {
                    console.log(JSON.stringify(jsonResponse));

                    const subRequests = [];
                    jsonResponse.map(booking => {
                        const subRequest = fetch(`http://localhost:5000/user/${booking["user_id"]}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic ' + encodedCredentials
                            }
                        }).catch(e => {
                            throw new Error('Service unreachable')
                        })
                            .then(response => response.json())
                            .then(jsonResponse => {
                                if (jsonResponse.code >= 300) {
                                    throw new Error(jsonResponse.msg)
                                } else {
                                    let fullName = jsonResponse["name"] + " " + jsonResponse["surname"];
                                    const renderItem = {
                                        fname: fullName,
                                        bookingId: booking["id"]
                                    };
                                    return renderItem;
                                }
                            })
                            .catch(e => {
                                alert(e.message)
                            });
                        subRequests.push(subRequest);

                    });

                    return Promise.all(subRequests);
                }
            })
            .then(renderItems => {
                console.log('all done');
                setBookingData(renderItems);
            })
            .catch(e => {
                alert(e.message)
            });


    }, [])




    const drawARow = function (bookingData) {
        return (
            <tr>
                <td>{bookingData["fname"]}</td>
                <td><Link to={`/booking/${bookingData["bookingId"]}`} className="details">Details</Link></td>
            </tr>
        )

    }



    return (
        <>
            <div class="heading"><h2 id="booking_header">Bookings for flight {flightNumber}</h2></div>
            <div class="flight-list">
                <Table id="booking_list_table">
                    <thead>
                        <tr>
                            <th>Passenger</th>
                            <th>Details</th>

                        </tr>
                    </thead>
                    <tbody>
                        {bookingData.map(booking => drawARow(booking))}


                    </tbody>
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        </>
    )
}
*/
