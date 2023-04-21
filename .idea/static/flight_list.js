window.onload = function() {

        fetch('http://localhost:5000/flight', {
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
              const flightTableRef = document.getElementById('flight_table').getElementsByTagName('tbody')[0];

              jsonResponse.map(flight => {

                let newRow = flightTableRef.insertRow(flightTableRef.rows.length);
                let status = flight["status"];
                switch (status) {
                    case 0: 
                        status = "Created";
                        break;
                    case 1: 
                        status = "Planned";
                        break;
                    case 2: 
                        status = "Gate opened";
                        break;
                    case 3: 
                        status = "Gate closed";
                        break;
                }

                newRow.innerHTML = 
                `<tr>
                <td>${flight["number"]}</td>
                <td>${status}</td>
                <td>${flight["departure_time"]}</td>
                <td><a href="booking_list.html?flight_id=${flight["id"]}" class="details">Bookings</a></td>
                <td><a href="flight.html?flight_id=${flight["id"]}" class="details">Details</a></td>
                </tr>`
              }
                
                )
            
          }
        })
          .catch(e => {
            alert(e.message)
          });

}