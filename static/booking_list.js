window.onload = function () {
    const flight_id = new URLSearchParams(window.location.search).get("flight_id");
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let encodedCredentials = btoa(email + ':' + password);
    console.log(encodedCredentials)
    const bookingHeaderElm = document.getElementById("booking_header");

    fetch(`http://localhost:5000/flight/${flight_id}`, {
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
          bookingHeaderElm.innerHTML = `Bookings for flight ${flight_number}`
            
        
      }
    })
      .catch(e => {
        alert(e.message)
      });




    

    fetch(`http://localhost:5000/flight/${flight_id}/booking`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodedCredentials
        }
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
                //const selectFlightElm = document.getElementById("flight_table");
                const bookingTableRef = document.getElementById('booking_list_table').getElementsByTagName('tbody')[0];

                jsonResponse.map(booking => {
                    let newRow = bookingTableRef.insertRow(bookingTableRef.rows.length);
                    
                    fetch(`http://localhost:5000/user/${booking["user_id"]}`, {
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

                            if (jsonResponse.code >= 300) {
                                throw new Error(jsonResponse.msg)
                            } else {
                                console.log(JSON.stringify(jsonResponse))
                                let fullName = jsonResponse["name"] + " " + jsonResponse["surname"];
                                console.log(fullName);
                                newRow.innerHTML =
                                    `<tr>
                        <td>${fullName}</td>
                        <td><a href="booking.html?booking_id=${booking["id"]}" class="details">Details</a></td>
                    </tr>`
                            }
                        })
                        .catch(e => {
                            alert(e.message)
                        });

                }

                )

            }
        })
        .catch(e => {
            alert(e.message)
        });

}