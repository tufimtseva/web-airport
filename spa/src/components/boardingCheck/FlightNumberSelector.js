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
                jsonResponse.map(flight => {
                    flightsTemp.push(flight)
                })
                setFlights(flightsTemp);
            });
        
    }, [])

    const handleSelection = (e) => {
        setFlightId(e.target.value)
        const status = flights.filter(flight => flight["id"] == e.target.value)[0]["status"];
        setFlightStatus(status);
    }

    const displayFlightNumbers = (flights) => {
        return <Input type="select" onChange={e => handleSelection(e)} className="dropdown">
            <option value={-1}>Flight number</option>
            {
                flights.map(
                    flight => <option value={flight["id"]}>{flight["number"]}</option>
                )
            }

        </Input>
    }

    return (
        <div className="box">
            <p className="text">Select flight</p>
            {displayFlightNumbers(flights)}
            <Button  className="set-button"><i>See all bookings</i></Button>
        </div>
    );

}