import  { Alert, Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Login = function() {
    const[password, setPassword] = useState('')
    const[email, setEmail] = useState('')
    const navigate = useNavigate();
    const[errorEmail, setErrorEmail] = useState('')
    const[errorPassword, setErrorPassword] = useState('')
    const[formValid, setFormValid] = useState(false)
    const[serverError, setServerError] = useState('');

    // useEffect(() => {
    //     console.log('password in useEffect: ' + password);
    //     setInterval(() => {
    //         console.log(document.querySelector('input[name="password"').value);
    //     }, 500);
        
    // }, []);


    useEffect (() => {
        if (errorEmail || errorPassword) {
          setFormValid(false);
        } else {
          setFormValid(true);
        }
      }, [errorEmail, errorPassword])

    const passwordHandler = (e) => {
        console.log('passwordHandler: ' + e.target.value);
        
        setPassword(e.target.value)
        //localStorage.setItem("password", e.target.value)
        if (e.target.value.length < 5) {
          setErrorPassword('Make it more than 5')
          if (!e.target.value) {
            setErrorPassword('Field can`t be empty');
          }
        } else {
           setErrorPassword("")
        }
        
      }

      const emailHandler = (e) => {
        setEmail(e.target.value)
          const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!e.target.value) {
          setErrorEmail('Field can`t be empty')
        } else if(!re.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('Incorrect email')
        } else {
          setErrorEmail("")
        }
      
      }


    const handleSubmit = (event) => {
        console.log("before processing: " + email);
        console.log("before processing: " + password);

    let encodedCredentials = btoa(email + ':' + password);
    console.log(encodedCredentials)
    event.preventDefault(); //??
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
                navigate("/boardingcheck");
                //window.location.href = "main.html"
              }
            })
            .catch(e => {
              //alert(e.message)
              setServerError(e.message)
            });
    }

    return(
        <div className="login-reg-box">
            <h1>Login</h1>
            <Form className="form_login_reg">
                <FormGroup>
                    <Label className="label_login_reg">Username</Label>
                    <Input onChange={e=>emailHandler(e)} type="text" className="input_login_reg" placeholder = "Email" name="email" required  invalid={errorEmail !== ''}/>
                    <FormFeedback >{errorEmail}</FormFeedback>
                </FormGroup>
                <FormGroup >
                    <Label className="label_login_reg">Password</Label>
                    <Input onChange={e=>passwordHandler(e)}  type="password" className="input_login_reg" placeholder = "Password" name="password" required invalid={errorPassword !== ''}/>
                    <FormFeedback >{errorPassword}</FormFeedback>
                    
                </FormGroup>
                <div>
                    <Button disabled = {!formValid} type="button" onClick={handleSubmit}>Login</Button>
                </div>
                <div >
             {serverError == '' ? null : <Alert color="danger" >{serverError}</Alert>}
           </div>

            </Form>
        </div>
        

    )
}