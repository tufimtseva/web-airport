import { useState, useEffect } from "react"
import { Button, Form, Input } from "reactstrap";
export const FlightNumberSelector = function (props) {
    //const flightId = props.flightId;
    const setFlightId = props.setFlightId;
    const [flights, setFlights] = useState([]);
    const setFlightStatus = props.setFlightStatus;
    useEffect(() => {
        const flightsTemp = [];
        fetch('http://localhost:5000/flight')
            .then(response => response.json())
            .then(jsonResponse => {
                setFlights(jsonResponse);
            }); 
    }, [])

    const handleSelection = (e) => {
        setFlightId(parseInt(e.target.value))
        const status = flights.filter(flight => flight["id"] == e.target.value)[0]["status"];
        setFlightStatus(status);
    }

    const displayFlightNumbers = (flights) => {
        return <Input data-testid="flight-number-selector-dropdown" type="select" onChange={e => handleSelection(e)} className="dropdown">
            <option value={-1}>Flight number</option>
            {
                flights.map(
                    flight => <option  value={flight["id"]}>{flight["number"]}</option>
                )
            }

        </Input>
    }

    return (
        <div className="box" data-testid="flight-number-selector">
            <p className="text">Select flight</p>
            {displayFlightNumbers(flights)}
            <Button  className="set-button"><i>See all bookings</i></Button>
        </div>
    );

}