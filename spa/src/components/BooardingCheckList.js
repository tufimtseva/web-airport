import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
export const BoardingCheckList = function () {
    const [boardingChecks, setBoardingChecks] = useState([]);
    //const [passengerId, setPassengerId] = useState(-1);
    let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));
    useEffect(() => {
        const boardingChecksTemp = [];
        fetch('http://localhost:5000/boarding-check', {
            headers: {
                'Authorization': 'Basic ' + encodedCredentials
            }
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const subRequests = [];
            jsonResponse.map(boardingCheck => {
                
                const subRequest = fetch(`http://localhost:5000/booking/${boardingCheck["booking_id"]}`, {
                  headers: {
                    'Authorization': 'Basic ' + encodedCredentials
                }
                })
                .then(response => response.json())
                .then(jsonResponse => {
                  //setPassengerId(jsonResponse["user_id"]);
                  // boardingChecksTemp.push({
                  //   boardingCheck: boardingCheck,
                  //   passengerId: jsonResponse["user_id"]
                  // })
                  return {
                    boardingCheck: boardingCheck,
                    passengerId: jsonResponse["user_id"]
                  };
                })

                subRequests.push(subRequest);
            })
            //setBoardingChecks(boardingChecksTemp);
            return Promise.all(subRequests);
          })
          .then(boardingCheckData => 
            setBoardingChecks(boardingCheckData)
          );
    
      }, [])
      const drawARaw = (boardingCheckData) => {
        const getType = (type) => {
          switch (type) {
            case 1:
              return type = "Passport check";
    
            case 2:
              return type = "Baggage check";
              ;
            case 3:
              return type = "Security check";
          }
    
        }
        return (
            <tr>
              <td>{boardingCheckData["boardingCheck"]["time"]}</td>
              <td>{getType(boardingCheckData["boardingCheck"]["type"])} </td>
              <td>{boardingCheckData["boardingCheck"]["result"]== 0 ? "Fail" : "Success"}</td>
              <td><Link to={`/manager/${boardingCheckData["boardingCheck"]["manager_id"]}`} className="details">Manager</Link></td>
              <td><Link to={`/user/${boardingCheckData["passengerId"]}`} className="details">Passenger</Link></td>
            </tr>  

    
        )
      }

    return(
        <div className="main-table">
        <div class="heading"><h2>All boarding checks</h2></div>
        <div class="flight-list">
        <Table>
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Type</th>
              <th>Result</th>
              <th>Manager</th>
              <th>Passenger</th>
            </tr>
          </thead>
          <tbody>
            {boardingChecks.map(boardingCheckData => drawARaw(boardingCheckData))}
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

    </div>
    )

}