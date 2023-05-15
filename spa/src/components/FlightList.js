import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
export const FlightList = function () {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const flightsTemp = [];
    fetch('http://localhost:5000/flight')
      .then(response => response.json())
      .then(jsonResponse => {
        jsonResponse.map(flight => {
          flightsTemp.push(flight)
        })
        setFlights(flightsTemp);

      });

  }, [])
  const drawARaw = (flight) => {
    const getStatus = (status) => {
      switch (status) {
        case 0:
          return status = "Created";

        case 1:
          return status = "Planned";

        case 2:
          return status = "Gate opened";
          ;
        case 3:
          return status = "Gate closed";
      }

    }
    return (


      <tr>
        <td>{flight["number"]}</td>
        <td>{getStatus(flight["status"])}</td>
        <td>{flight["departure_time"]}</td>
        <td><Link to={`/booking?flightid=${flight["id"]}`} className="details">Bookings</Link></td>
        <td><Link to={`/flight/${flight["id"]}`} className="details">Details</Link></td>
      </tr>



    )
  }

  return (
    <>
      <div className="heading"><h2>All flights</h2></div>
      <div className="flight-list">
        <Table >
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Status</th>
              <th>Date</th>
              <th>Bookings</th>
              <th>More</th>

            </tr>
          </thead>
          <tbody>
            {flights.map(flight => drawARaw(flight))}
          </tbody>
          <tfoot>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>

  )
}