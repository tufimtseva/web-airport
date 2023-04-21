

function registration(e) {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    //const formData = new FormData(event.target);
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    let password = object['password'];
    console.log("password" + password)


    const firstName = form.elements['name'].value;
    fetch('http://localhost:5000/user', {
        method: 'post',
        body: json,
        headers: {
            'Content-Type': 'application/json'
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