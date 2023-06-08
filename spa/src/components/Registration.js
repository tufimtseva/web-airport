import  { Alert, Form, FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Registration = function() {
    const navigate = useNavigate();
    const[name, setName] = useState('');
    const[errorName, setErrorName] = useState('')

    const[surname, setSurname] = useState('');
    const[errorSurname, setErrorSurname] = useState('')

    const[email, setEmail] = useState('')
    const[errorEmail, setErrorEmail] = useState('')

    const[country, setCountry] = useState('')
    const[errorCountry, setErrorCountry] = useState('')

    const [dateOfBith, setDateOfBirth] = useState('')

    const[password, setPassword] = useState('')
    const[errorPassword, setErrorPassword] = useState('')

    const[passportNumber, setPassportNumber] = useState('')
    const[errorPassportNumber, setErrorPassportNumber] = useState('')
    
    const[formValid, setFormValid] = useState(false)
    const[serverError, setServerError] = useState('');

    useEffect(() =>{
      if(errorEmail || errorPassword || errorName || errorName || !dateOfBith || errorCountry || errorPassportNumber){
        setFormValid(false)
      } else {
        setFormValid(true)
      }
    }, [errorEmail, errorPassword, errorName, errorName, dateOfBith, errorCountry, errorPassportNumber])


    const nameHandler = (e) =>{
        setName(e.target.value)
        if (e.target.value ===''){
          setErrorName('Field can`t be empty')
        } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
          setErrorName('Your name contains inapropriate symbols')
        }else{
          setErrorName('')
        }
    
      }

      const surnameHandler = (e) => {
        setSurname(e.target.value)
        if (e.target.value ===''){
          setErrorSurname('Field can`t be empty')
        } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
          setErrorSurname('Your surname contains inapropriate symbols')
        } else {
          setErrorSurname('')
        }
      }

      const countryHandler = (e) => {
        setCountry(e.target.value)
        if (e.target.value ===''){
          setErrorCountry('Field can`t be empty')
        } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
            setErrorCountry('Name of the country contains inapropriate symbols')
        } else {
            setErrorCountry('')
        }
      }

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

      const passportNumberHandler = (e) => {      
        setPassportNumber(e.target.value)
        //localStorage.setItem("password", e.target.value)
        if (e.target.value.length != 6) {
          setErrorPassportNumber('Length must be equal to 6')
          if (!e.target.value) {
            setErrorPassportNumber('Field can`t be empty');
          }
        } else {
            setErrorPassportNumber("")
        }  
      }

      const handleSubmit = () => {
        fetch('http://localhost:5000/user', {
        method: 'post',
        body: JSON.stringify(
            {
              name: name,
              surname: surname,
              email: email,
              country: country,
              date_of_birth : dateOfBith,
              password: password,
              passport_number: passportNumber,
              role: "manager"
            }
          ),
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
                navigate('/boardingcheck')
              }
            })
            .catch(e => {
              //alert(e.message)
              setServerError(e.message)
            });
      }


    return(
        <div className="login-reg-box">
            <h1>Register</h1>
            <Form classNameName="form_login_reg">
                <FormGroup>
                    <Label htmlFor="firstName"className="label_login_reg">FirstName</Label>
                    <Input id="firstName"onChange={e=>nameHandler(e)} type="text" className="input_login_reg" placeholder = "First name" name="name" required  invalid={errorName !== ''}/>
                    <FormFeedback>{errorName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName" className="label_login_reg">LastName</Label>
                    <Input id="lastName" onChange={e=>surnameHandler(e)} type="text" className="input_login_reg" placeholder = "Last name" name="surname" required  invalid={errorSurname !== ''}/>
                    <FormFeedback>{errorSurname}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email" className="label_login_reg">Email</Label>
                    <Input id="email"onChange={e=>emailHandler(e)} type="text" className="input_login_reg" placeholder = "Email" name="email" required  invalid={errorEmail !== ''}/>
                    <FormFeedback>{errorEmail}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="country" className="label_login_reg">Country</Label>
                    <Input id = "country" onChange={e=>countryHandler(e)} type="text" className="input_login_reg" placeholder = "Country" name="country" required  invalid={errorCountry !== ''}/>
                    <FormFeedback>{errorCountry}</FormFeedback>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="birthDate" className="label_login_reg">Birth date</Label>
                <Input id="birthDate" type = 'date' onChange = {e=>setDateOfBirth(e.target.value)} className="input_login_reg" name = 'dateOfBirth' placeholder = 'Pick your birth date...' required />
                </FormGroup>
                <FormGroup >
                    <Label htmlFor="password" className="label_login_reg">Password</Label>
                    <Input id="password" onChange={e=>passwordHandler(e)}  type="password" className="input_login_reg" placeholder = "Password" name="password" required invalid={errorPassword !== ''}/>
                    <FormFeedback>{errorPassword}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="passportNumber" className="label_login_reg">Passport number</Label>
                    <Input id="passportNumber" onChange={e=>passportNumberHandler(e)} type="text" className="input_login_reg" placeholder = "Passport number" name="passportNumber" required  invalid={errorPassportNumber !== ''}/>
                    <FormFeedback>{errorPassportNumber}</FormFeedback>
                </FormGroup>
                <div>
                    <Button disabled = {!formValid} type="button" onClick={handleSubmit}>Register</Button>
                </div>
                <div>
                {serverError == '' ? null : <Alert color="danger" >{serverError}</Alert>}
                </div>

        </Form>
    </div>

    )
}