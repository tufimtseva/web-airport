import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
import { io } from 'socket.io-client';
let socket;

export const Report = function () {
    const { flightId } = useParams();
    // const [flightStatus, setFlightStatus] = useState("")
    const [report, setReport] = useState({});
    const [flightStatus, setFlightStatus] = useState("")

    let encodedCredentials = btoa(localStorage.getItem('email') + ':' + localStorage.getItem('password'));
    useEffect(() => {
                // create websocket/connect
                socket = io("ws://localhost:5000");
                console.log(socket.connected);
                socket.emit("report", flightId);
                socket.on("report", (data) => {
                    console.log("received data:" + JSON.stringify(data));
                    setReport(data)
                    let status = data["flight_status"];
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
                })
                // when component unmounts, disconnect
                return (() => {
                    socket.disconnect()
                })
            
        
    }, [])

    return (
        <div className='main-details'>
            <div class="profile-container">
                <div class="profile-header">

                    <h1 class="profile-name">Flight report</h1>
                </div>
                <div class="profile-details">
                    <table>
                        <tbody>
                            
                        
                            <tr>
                                <td><strong>Number:</strong></td>
                                <td id="number" class="value">{report["flight_number"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td id="status" class="value">{flightStatus}</td>
                            </tr>
                            <tr>
                                <td><strong>Total clients who booked:</strong></td>
                                <td id="departure_city" class="value">{report["booked"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Total clients who boarded:</strong></td>
                                <td id="arrival_city" class="value">{report["boarded"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Total baggage count:</strong></td>
                                <td id="departure_time" class="value">{report["baggage_count"]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}