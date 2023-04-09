window.onload = function() {


    const booking_id = new URLSearchParams(window.location.search).get("booking_id");
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let encodedCredentials = btoa(email + ':' + password);
    console.log(encodedCredentials)
    fetch(`http://localhost:5000/booking/${booking_id}`, {
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
                const reservationTimeElm = document.getElementById("reservation_time");
                reservationTimeElm.innerHTML = jsonResponse["reservation_time"];

                const baggageCount = document.getElementById("baggage_count");
                baggageCount.innerHTML = jsonResponse["baggage_count"];
                let flight_id = jsonResponse["flight_id"];


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
                      const flightNumberElm = document.getElementById("flight_number");
                      flightNumberElm.innerHTML = `<a href="flight.html?flight_id=${flight_id}">${flight_number}</a>`;
                        
                    
                  }
                })
                  .catch(e => {
                    alert(e.message)
                  });

                

              }
            })
            .catch(e => {
              alert(e.message)
            });


}