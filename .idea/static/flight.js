window.onload = function () {
    const flight_id = new URLSearchParams(window.location.search).get("flight_id");
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
            
          const numberElm = document.getElementById("number");
          numberElm.innerHTML = jsonResponse["number"];

            const departureCityElm = document.getElementById("departure_city");
            departureCityElm.innerHTML = jsonResponse["departure_city"];

            const arrivalCityElm = document.getElementById("arrival_city");
            arrivalCityElm.innerHTML = jsonResponse["arrival_city"];

            const departureTimeElm = document.getElementById("departure_time");
            departureTimeElm.innerHTML = jsonResponse["departure_time"];

            const arrivalTimeElm = document.getElementById("arrival_time");
            arrivalTimeElm.innerHTML = jsonResponse["arrival_time"];

            const statusElm = document.getElementById("status");
            let status = jsonResponse["status"];
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
            statusElm.innerHTML = status;
            
      }
    })
      .catch(e => {
        alert(e.message)
      });
}