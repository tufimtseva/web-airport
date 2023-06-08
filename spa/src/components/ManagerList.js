import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
export const ManagerList = function () {
    const [managers, setManagers] = useState([]);
    let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));

    useEffect(() => {
        const managersTemp = [];
        fetch('http://localhost:5000/manager', {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + encodedCredentials
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
            
                setManagers(jsonResponse);
            });

    }, [])

    const renderManager = (manager, imgSrc) => {
        return(          
        <div>
            <Link to={`/manager/${manager["id"]}`} class="user-card">
              <img src={imgSrc} alt="User Profile Picture"/>
              <h2>{manager["name"] + " " + manager["surname"]}</h2>
              <p>{manager["email"]}</p>
    
            </Link>
          </div>);
    }

    return (
        <>
        <header>
        <h1>Managers</h1>
      </header>
      <div className="manager-list">
    
        <div data-testid="container" class="users-container">
        {managers.map(manager => renderManager(manager, `https://randomuser.me/api/portraits/women/${manager["id"]}.jpg`))}
          
          </div>
      </div>
      </>
    )

}