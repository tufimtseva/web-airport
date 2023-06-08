import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";


export const Booking = function() {
    const {bookingId} = useParams();
    const [flightNumber, setFlightNumber] = useState(-1);
    const [bookingData, setBookingData] = useState([]);
    let encodedCredentials = btoa(localStorage.getItem('email') + ':' + localStorage.getItem('password'));
    useEffect(() => {
        fetch(`http://localhost:5000/booking/${bookingId}`, {
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
    
                  if (jsonResponse.code >=300) {
                    throw new Error(jsonResponse.msg)
                  } else {
                    console.log(JSON.stringify(jsonResponse))
                    setBookingData(jsonResponse);
                    let flight_id = jsonResponse["flight_id"];
    
    
                    const innerFetch = fetch(`http://localhost:5000/flight/${flight_id}`, {
                        method: 'GET'
                    })
                    .catch(e => {
                        throw new Error('Service unreachable')
                      })
                      .then(response => response.json())
                      .then(jsonResponse => {
                
                        if (jsonResponse.code >=300) {
                          throw new Error(jsonResponse.msg)
                        } else {
                          console.log(JSON.stringify(jsonResponse));
                          let flight_number = jsonResponse["number"];
                          setFlightNumber(flight_number);
                                               
                      }
                    })
                      .catch(e => {
                        alert(e.message)
                      });
                    
                    
                      return innerFetch;
                  }
                 
                })
                .catch(e => {
                  alert(e.message)
                });
    },[])

    return (
        <div className='main-details'>
        <div class="profile-container">
        <div class="profile-header">
          <h1 class="profile-name">Booking</h1>
        </div>
        <div class="profile-details">
          <h2 class="profile-section-title">Booking details</h2>
          <table>
            <tbody>
              <tr>
                <td><strong >Reservation time:</strong></td>
                <td id="reservation_time" class="value">{bookingData["reservation_time"]}</td>
              </tr>
              <tr>
                <td><strong >Baggage count:</strong></td>
                <td id="baggage_count" class="value">{bookingData["baggage_count"]}</td>
              </tr>
              <tr>
                <td><strong >Flight number:</strong></td>
                <td id="flight_number" class="value"><Link to={`/flight/${bookingData["flight_id"]}`}>{flightNumber}</Link></td>
              </tr>            
            </tbody>
          </table>
        </div>
      </div>
      </div>
    )
}
