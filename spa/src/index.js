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
      <Route path='/boardingcheck' element={<Boardingcheck/>}/>
    </Routes>
   </div>
   <Footer/>
  </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


