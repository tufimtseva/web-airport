import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
export const ManagerProfile = function (props) {
    //const formType = 'customProfile';
    const { managerId } = useParams();
    const [managerData, setManagerdata] = useState([]);
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
            });
    }, [])

    return (
        <div className='main-details'>
            <div class="profile-container">
                <div class="profile-header">
                    <h1 id="global_name" class="profile-name">{managerData["name"] + " " + managerData["surname"]}</h1>
                </div>
                <div class="profile-details">
                    <h2 class="profile-section-title">Personal Information</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Full Name:</strong></td>
                                <td id="full_name" class="value">{managerData["name"] + " " + managerData["surname"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td id="email" class="value">{managerData["email"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Counrty:</strong></td>
                                <td id="country" class="value">{managerData["country"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Date of Birth:</strong></td>
                                <td id="date_of_birth" class="value">{managerData["date_of_birth"]}</td>
                            </tr>
                            <tr>
                                <td><strong>Passport number:</strong></td>
                                <td id="passport_number" class="value">{managerData["passport_number"]}</td>
                            </tr>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                    {localStorage.getItem('id') == managerData['id'] ?
                    <>
                       <a href="edit_profile.html">Edit profile</a>
                       <div className="logout"> <Link to="/" onClick={() => localStorage.clear()}>Logout</Link></div>
                       </>
                        :

                    
                            <></>
                           
                      
                    }
                     
                </div>
            </div>
        </div>
    );
}