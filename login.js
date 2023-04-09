

function login(e) {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    //const formData = new FormData(event.target);
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    console.log(json);
    let email = object['email'];
    let password = object['password'];
    console.log(email);
    console.log(password);

    let encodedCredentials = btoa(email + ':' + password);
    console.log(encodedCredentials)

    fetch('http://localhost:5000/user/login', {
        method: 'post',
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
                let email = jsonResponse["email"];
                let id = jsonResponse["id"];
                console.log(email)
                console.log(id)
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                localStorage.setItem("id", id);
                window.location.href = "main.html"
              }
            })
            .catch(e => {
              alert(e.message)
            });

    return false;
}
