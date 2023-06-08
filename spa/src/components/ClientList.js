import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
export const ClientList = function () {
    const [clients, setClients] = useState([]);
    let encodedCredentials = btoa(localStorage.getItem("email") + ':' + localStorage.getItem("password"));
    useEffect(() => {
        const usersTemp = [];
        fetch('http://localhost:5000/user', {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + encodedCredentials
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                jsonResponse.map(user => {
                    usersTemp.push(user)
                })
                setClients(usersTemp);
            });

    }, [])
    const drawARaw = (client) => {
        return (
            <tr>
                <td>{client["name"]}</td>
                <td>{client["surname"]}</td>
                <td><Link to={`/user/${client["id"]}`} className="details">Details</Link></td>
            </tr>
        )
    }
    return (
        <div className="main-table">
            <div className="heading"><h2>All clients</h2></div>
            <div className="flight-list">
                <Table>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Date of birth</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody data-testid="table-body-client">
                        {clients.map(client => drawARaw(client))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </div>
    )
}