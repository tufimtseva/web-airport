import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
export const UserProfile = function () {
    //const formType = 'customProfile';
    const { userId } = useParams();
    const [userData, setUserData] = useState([]);
    let encodedCredentials = btoa(localStorage.getItem('email') + ':' + localStorage.getItem('password'));

    useEffect(() => {
        fetch(`http://localhost:5000/user/${userId}`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedCredentials
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(JSON.stringify(jsonResponse))
                setUserData(jsonResponse);
            });
    }, [])

    return (
        <div class="profile-container">
        <div class="profile-header">
        {userData !== null ? <h1 id="global_name" class="profile-name">{userData["name"] + " " + userData["surname"]}</h1> : <></>}

          
        </div>
        <div class="profile-details">
          <h2 class="profile-section-title">Personal Information</h2>
          <table>
            <tbody>
            {userData !== null ?
            <>
                          <tr>
                <td><strong>Full Name:</strong></td>
                <td class="value">{userData["name"] + " " + userData["surname"]}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td class="value">{userData["email"]}</td>
              </tr>
              <tr>
                <td><strong>Country:</strong></td>
                <td class="value">{userData["country"]}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td class="value">{userData["date_of_birth"]}</td>
              </tr>
            
            </> :
            <></>
          }

              {/* <tr>
                <td><strong>Gender:</strong></td>
                <td class="value">Male</td>
              </tr> */}
            </tbody>
          </table>
          <h2 class="profile-section-title">History</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Total Trips this year:</strong></td>
                <td class="value">10</td>
              </tr>
              <tr>
                <td><strong>Last Trip:</strong></td>
                <td class="value">June 2022</td>
              </tr>
              <tr>
                <td><strong>Special remarks:</strong></td>
                <td class="value">None</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td class="value">1990-02-21</td>
              </tr>
              <tr>
                <td><strong class="danger">Is in danger list:</strong></td>
                <td class="value">No</td>
              </tr>
            </tbody>
          </table>
    
        </div>
      </div>
    );
}