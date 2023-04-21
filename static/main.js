window.onload = function() {
    const flightsDropDown = function () {
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
              const selectFlightElm = document.getElementById("select_flight");
              let value = 1;
              jsonResponse.map(flight => {
                const opt = document.createElement("option");
                opt.value = value;
                value += 1;
                opt.text = flight["number"];
                selectFlightElm.add(opt);
              }
                
                )
            
          }
        })
          .catch(e => {
            alert(e.message)
          });

        //return false;
    }
    flightsDropDown();
}