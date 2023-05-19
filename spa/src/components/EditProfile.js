import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Alert, Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
export const EditProfile = function () {
    const { managerId } = useParams();
    const [managerData, setManagerdata] = useState([]);

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('')

    const [surname, setSurname] = useState('');
    const [errorSurname, setErrorSurname] = useState('')

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    const [country, setCountry] = useState('')
    const [errorCountry, setErrorCountry] = useState('')

    const [dateOfBith, setDateOfBirth] = useState('')

    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [passportNumber, setPassportNumber] = useState('')
    const [errorPassportNumber, setErrorPassportNumber] = useState('')

    const [formValid, setFormValid] = useState(false)
    const [serverError, setServerError] = useState('');
    let encodedCredentials = btoa(localStorage.getItem('email') + ':' + localStorage.getItem('password'));

    useEffect(() => {
        fetch(`http://localhost:5000/user/${managerId}`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedCredentials
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(JSON.stringify(jsonResponse))
                setManagerdata(jsonResponse);
                setName(jsonResponse["name"]);
                setSurname(jsonResponse["surname"]);
                setEmail(jsonResponse["email"]);
                setCountry(jsonResponse["country"]);
                setDateOfBirth(jsonResponse["date_of_birth"]);
                setPassportNumber(jsonResponse["passport_number"])
            });
    }, [])




    useEffect(() => {
        if (errorEmail || errorPassword || errorName || errorName || !dateOfBith || errorCountry || errorPassportNumber) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorEmail, errorPassword, errorName, errorName, dateOfBith, errorCountry, errorPassportNumber])


    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value === '') {
            setErrorName('Field can`t be empty')
        } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
            setErrorName('Your name contains inapropriate symbols')
        } else {
            setErrorName('')
        }

    }

    const surnameHandler = (e) => {
        setSurname(e.target.value)
        if (e.target.value === '') {
            setErrorSurname('Field can`t be empty')
        } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
            setErrorSurname('Your surname contains inapropriate symbols')
        } else {
            setErrorSurname('')
        }
    }

    const countryHandler = (e) => {
        setCountry(e.target.value)
        if (e.target.value === '') {
            setErrorCountry('Field can`t be empty')
        } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
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
        } else if (!re.test(String(e.target.value).toLowerCase())) {
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
        fetch(`http://localhost:5000/user/${managerData['id']}`, {
            method: 'put',
            body: JSON.stringify(
                {
                    name: name,
                    surname: surname,
                    email: email,
                    country: country,
                    date_of_birth: dateOfBith,
                    password: password,
                    passport_number: passportNumber,
                    role: "manager"
                }
            ),
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
                    let email = jsonResponse["email"];
                    let id = jsonResponse["id"];
                    console.log(email)
                    console.log(id)
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("id", id);

                }
            })
            .catch(e => {
                //alert(e.message)
                setServerError(e.message)
            });
    }


    return (
        <div class="edit-profile-container">
            <h1 class="edit-profile-title">Edit Profile</h1>
            <Form class="edit-profile-form">
                <FormGroup class="edit-profile-form-group">
                    <Label for="full-name">First Name</Label>
                    <Input type="text" onChange={e => nameHandler(e)} name="full-name" defaultValue={managerData["name"]} required invalid={errorName !== ''} />
                    <FormFeedback>{errorName}</FormFeedback>
                </FormGroup>
                <FormGroup class="edit-profile-form-group">
                    <Label for="full-name">Last Name</Label>
                    <Input type="text" onChange={e => surnameHandler(e)} name="full-name" defaultValue={managerData["surname"]} required invalid={errorSurname !== ''} />
                    <FormFeedback>{errorSurname}</FormFeedback>
                </FormGroup>
                <FormGroup class="edit-profile-form-group">
                    <Label for="email">Email</Label>
                    <Input type="email" onChange={e => emailHandler(e)} id="email" name="email" defaultValue={managerData["email"]} required invalid={errorEmail !== ''} />
                    <FormFeedback>{errorEmail}</FormFeedback>
                </FormGroup>
                <FormGroup >
                    <Label >Password</Label>
                    <Input onChange={e => passwordHandler(e)} type="password" placeholder="Password" name="password" required invalid={errorPassword !== ''} />
                    <FormFeedback>{errorPassword}</FormFeedback>
                </FormGroup>
                <FormGroup class="edit-profile-form-group">
                    <Label for="country">Country</Label>
                    <Input type="text" onChange={e => countryHandler(e)} id="country" name="country" defaultValue={managerData["country"]} invalid={errorCountry !== ''} />
                    <FormFeedback>{errorCountry}</FormFeedback>
                </FormGroup>
                <FormGroup class="edit-profile-form-group">
                    <Label for="date-of-birth">Date of Birth</Label>
                    <Input type="date" onChange={e => setDateOfBirth(e.target.value)} id="date-of-birth" name="date-of-birth" defaultValue={managerData["date_of_birth"]} required />
                </FormGroup>
                <FormGroup class="edit-profile-form-group">
                    <Label for="country">Passport number</Label>
                    <Input type="text" onChange={e => passportNumberHandler(e)} id="country" name="country" defaultValue={managerData["passport_number"]} required invalid={errorPassportNumber !== ''} />
                    <FormFeedback>{errorPassportNumber}</FormFeedback>
                </FormGroup>
                <div class="edit-profile-form-group">
                    <Button disabled={!formValid} type="button" onClick={handleSubmit} class="save-changes-button">Save Changes</Button>
                </div>
                <div>
                    {serverError == '' ? null : <Alert color="danger" >{serverError}</Alert>}
                </div>
            </Form>
        </div>
    );
}