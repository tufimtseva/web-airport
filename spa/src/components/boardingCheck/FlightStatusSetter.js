import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";
export const FlightStatusSetter = function (props) {
    const flightId = props.flightId;
    const [flightStatus, setFlightStatus] = useState(0);

    const currentStatus = props.flightStatus;
    const statusMap = new Map();
    statusMap.set(-1, 'Flight status');
    statusMap.set(0, 'Crearted');
    statusMap.set(1, 'Planned');
    statusMap.set(2, 'Gate opened');
    statusMap.set(3, 'Gate closed');

    const changeStatus = (flightStatus) => {
        let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));
        console.log(encodedCredentials)
        fetch(`http://localhost:5000//flight/${flightId}/public-status`, {
            method: 'put',
            body: JSON.stringify(
                {
                  status: flightStatus
                }
              ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedCredentials
            }
        }
        )
        .then(response => response.json())
        .then(
          jsonResponse => {console.log("updated status for " + jsonResponse["number"] + ", new status: " + jsonResponse["status"]);
        });
    }

    return (
        <div className="box" data-testid="flight-status-selector">
            <p className="text">Set flight status</p>
            <Input data-testid="flight-status-selector-dropdown" type="select" className="dropdown" onChange={e => setFlightStatus(parseInt(e.target.value))}>
              {Array.from(statusMap.entries()).map((entry) => <option selected={entry[0] == currentStatus} value={entry[0]}>{entry[1]}</option>)}
              {/* <option value={-1}>Flight status</option>
              <option value={0}>Created</option>
              <option value={1}>Planned</option>
              <option value={2}>Gate opened</option>
              <option value={3}>Gate closed</option> */}
            </Input>
         <Button data-testid="set" disabled={flightId == -1} onClick={e => changeStatus(flightStatus)} className="set-button">Set</Button>
          </div>
    );

}
