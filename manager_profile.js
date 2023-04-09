window.onload = function() {


    let id = localStorage.getItem("id");
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let encodedCredentials = btoa(email + ':' + password);
    console.log(encodedCredentials)
    fetch(`http://localhost:5000/user/${id}`, {
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
                const globalNameElm = document.getElementById("global_name");
                globalNameElm.innerHTML = jsonResponse["name"] + " " +  jsonResponse["surname"];

                const fullName = document.getElementById("full_name");
                fullName.innerHTML = globalNameElm.innerHTML;

                const emailElm = document.getElementById("email");
                emailElm.innerHTML = jsonResponse["email"];


                const countryElm = document.getElementById("country");
                countryElm.innerHTML = jsonResponse["country"];

                const passportElm = document.getElementById("passport_number");
                passportElm.innerHTML = jsonResponse["passport_number"];

                const dateOfBirthElm = document.getElementById("date_of_birth");
                dateOfBirthElm.innerHTML = jsonResponse["date_of_birth"];

                // let email = jsonResponse["email"];
                // console.log(email)
                // localStorage.setItem("email", email);
                // localStorage.setItem("password", password);
                // window.location.href = "main.html"
              }
            })
            .catch(e => {
              alert(e.message)
            });

    return false;
}