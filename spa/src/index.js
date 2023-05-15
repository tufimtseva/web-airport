import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Start } from './components/Start';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Boardingcheck } from './components/boardingCheck/BoardingCheck';
import { Footer } from './components/Footer';
import { FlightList } from './components/FlightList';
import { BoardingCheckList } from './components/BooardingCheckList';
import { ClientList } from './components/ClientList';
import { ManagerList } from './components/ManagerList';
import { BookingList } from './components/BookingList';
import { Booking } from './components/Booking';
import { Flight } from './components/Flight';
import { ManagerProfile } from './components/ManagerProfile'
import { UserProfile } from './components/UserProfile';
import { Authorized } from './components/Authorized';
import reportWebVitals from './reportWebVitals';
 
// import styles from './styles.css';
import styles from './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Navbar/>
   <div className="main">
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      
      <Route path='/boardingcheck' element={<Authorized><Boardingcheck/></Authorized>}/>
      <Route path='/flightlist' element={<Authorized><FlightList/></Authorized>}/>
      <Route path='/boardingchecklist' element={<Authorized><BoardingCheckList/></Authorized>}/>
      <Route path='/clientlist' element={<Authorized><ClientList/></Authorized>}/>
      <Route path='/managerlist' element={<Authorized><ManagerList/></Authorized>}/>
      <Route path='/booking' element={<Authorized><BookingList/></Authorized>}/>
      <Route path='/booking/:bookingId' element={<Authorized><Booking/></Authorized>}/>
      <Route path='/flight/:flightId' element={<Authorized><Flight/></Authorized>}/>
      <Route path='/manager/:managerId' element={<Authorized><ManagerProfile/></Authorized>}/>
      <Route path='/user/:userId' element={<Authorized><UserProfile/></Authorized>}/>
     
    </Routes>
   </div>
   <Footer/>
  </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


