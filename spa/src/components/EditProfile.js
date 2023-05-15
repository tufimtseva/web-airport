import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom";
export const EditProfile = function() {
    const { managerId } = useParams();
    const [managerData, setManagerdata] = useState([]);


    
}