import { useState, useEffect } from "react"
import { Button, Form, Input } from "reactstrap";
export const PassengerCheck = function (props) {
    const flightId = props.flightId;
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [userId, setUserId] = useState(-1)
    const [bookingId, setBookingId] = useState(-1)
    const[checkType, setCheckType] = useState(-1)
    let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));
    useEffect( () => {
        const usersTemp = [];

        console.log(encodedCredentials)
        if (flightId != -1) {
            fetch(`http://localhost:5000//flight/${flightId}/user`, {
                method: 'get',
                headers: {
                    'Authorization': 'Basic ' + encodedCredentials
                }
            }
            )
            .then(response => response.json())
            .then(jsonResponse => {
                setUsers(jsonResponse);
            });
        }


    }, [flightId])


    const findUserAndBooking = (passportNumber) => {
        const enteredUserId = users.filter(user => user["passport_number"] == passportNumber)[0]["id"]
        setUserId(enteredUserId)

        const bookingsTemp = [];
        fetch(`http://localhost:5000//flight/${flightId}/booking`, {
            method: 'get',
            headers: {
                'Authorization': 'Basic ' + encodedCredentials
            }
        }
        )
        .then(response => response.json())
        .then(jsonResponse => {
            jsonResponse.map(booking => {
                bookingsTemp.push(booking)
            })
            setBookings(bookingsTemp)
            const booking_id = bookingsTemp.filter(booking => booking["user_id"] == enteredUserId)[0]["id"]
            setBookingId(booking_id)
            console.log("for user id: " + enteredUserId + "found booking id: " + booking_id)
            //var todayDate = new Date().toISOString().slice(0, 10);
        });

    }

    const addBoardingCheck = (res) => {
        console.log(encodedCredentials)
        fetch('http://localhost:5000//boarding-check', {
            method: 'post',
            body: JSON.stringify(
                {
                    type: checkType,
                    result: res,
                    manager_id: localStorage.getItem("id"),
                    booking_id: bookingId,
                    time:  new Date().toISOString()
                }
              ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedCredentials
            }
        }
        )
        .then(response => response.json())
        .then(jsonResponse => console.log("posted! " + JSON.stringify(jsonResponse)));
    }

       
    return (
        <div className="box" data-testid="passenger-check">
        <div className="select-passenger"> 
          <p className="text">Select a passenger</p>
          <Input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
          <Input type="text" placeholder="Surname" onChange={e => setSurname(e.target.value)}/>
          <Input type="text" disabled={users.length == 0} placeholder="Passport number" onChange={e => setPassportNumber(e.target.value)}/>
        </div>
        <Button data-testid="search" disabled={flightId == -1 || passportNumber == '' || users.length == 0} onClick={e => findUserAndBooking(passportNumber)} className="set-button">Search</Button>

        {/* <a href="profile.html"><i>Go to passenger's profile</i></a> */}
        {/* <Button  className="set-button"><i>Go to passenger's profile</i></Button> */}
        {/* <a href="booking.html"><i>See passenger's booking</i></a> */}
        {/* <Button  className="set-button"><i>See passenger's booking</i></Button> */}
        <Input type="select" data-testid="check-type-selector" className="dropdown" onChange={e => setCheckType(parseInt(e.target.value))}>
            <option value={-1}>Check type</option>
              <option value={1}>Passport check</option>
              <option value={2}>Baggage check</option>
              <option value={3}>Security check</option>

        </Input>
          <div class="buttons">
            <Button className="success" disabled={checkType == -1 || userId == -1} onClick={e => addBoardingCheck(1)}>Success</Button>
            <Button className="fail" disabled={checkType == -1 || userId == -1}  onClick={e => addBoardingCheck(0)}>Fail</Button>
          </div>
      </div>
          
    );

}