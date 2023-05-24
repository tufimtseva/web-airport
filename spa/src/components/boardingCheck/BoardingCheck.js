import { useState, useEffect } from "react"
import { FlightNumberSelector } from "./FlightNumberSelector"
import { FlightStatusSetter } from "./FlightStatusSetter"
import { PassengerCheck } from "./PassengerCheck"
export const Boardingcheck = function() {
    const[flightId, setFlightId] = useState(-1)
    const[flightStatus, setFlightStatus] = useState(-1)

    useEffect(() => {console.log("flight id: " + flightId)}, [flightId]) 
    useEffect(() => {console.log("flight status: " + flightStatus)}, [flightStatus])
    return(
        <div data-testid="yyy" className="container-dropdown">
            <FlightNumberSelector setFlightId={setFlightId} setFlightStatus={setFlightStatus}/>
            <FlightStatusSetter data-testid="flight-status-setter123" flightId={flightId} flightStatus={flightStatus}/>
            <PassengerCheck flightId={flightId}/>
        </div>
    );
    

}