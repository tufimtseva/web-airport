import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
export const Flight = function () {
    const { flightId } = useParams();
    const [flightStatus, setFlightStatus] = useState("")
    const [flightData, setFlightData] = useState(null);

    let encodedCredentials = btoa(localStorage.getItem('email') + ':' + localStorage.getItem('password'));
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
                    console.log(JSON.stringify(jsonResponse));
                    setFlightData(jsonResponse);

                    let status = jsonResponse["status"];
                    switch (status) {
                        case 0:
                            status = "Created";
                            break;
                        case 1:
                            status = "Planned";
                            break;
                        case 2:
                            status = "Gate opened";
                            break;
                        case 3:
                            status = "Gate closed";
                            break;
                    }
                    setFlightStatus(status);
                    console.log(status);

                }
            })
            .catch(e => {
                alert(e.message)
            });
    }, [])

    return (
        <div className='main-details'>
            <div class="profile-container">
                <div class="profile-header">

                    <h1 class="profile-name">Flight info</h1>
                </div>
                <div class="profile-details">
                    <table>
                        <tbody>
                            
                            {flightData !== null ? 
                            <>
                            <tr>
                                <td><strong>Number:</strong></td>
                                <td id="number" class="value">{flightData["number"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Departure city:</strong></td>
                                <td id="departure_city" class="value">{flightData["departure_city"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Arrival city:</strong></td>
                                <td id="arrival_city" class="value">{flightData["arrival_city"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Departure time:</strong></td>
                                <td id="departure_time" class="value">{flightData["departure_time"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Arrival time:</strong></td>
                                <td id="arrival_time" class="value">{flightData["arrival_time"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td id="status" class="value">{flightStatus}</td>
                            </tr>
                            </>
: <></>}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}