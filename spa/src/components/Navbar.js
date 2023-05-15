import { useLocation, Link } from "react-router-dom";
import  { Alert, Form, FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";
import Utils from '../classes/Utils'
import { useState } from "react"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

export const Navbar = function () {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const renderLogo = (pathname) => {
        return (
            pathname === '/' || pathname === '/login' || pathname === '/registration' ?
            <li><Link to='/' className="logo">SL</Link></li>:
            <li><Link to='/boardingcheck' className="logo">SL</Link></li>
        )
    }
    const renderMenu = (pathname) => {
        return (
            pathname === '/' || pathname === '/login' || pathname === '/registration' ?
                <></>
                : <li>
                    <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction="down">
                        <DropdownToggle caret size="lg" color="primary" className="logo">Menu</DropdownToggle>
                        <DropdownMenu className="dpMenu">
                            <DropdownItem ><Link to='/flightlist'  >Flights</Link></DropdownItem>

                            <DropdownItem><Link to='/boardingchecklist' >Boarding checks</Link></DropdownItem>

                            <DropdownItem ><Link to='/clientlist'  >Clients</Link></DropdownItem>

                            <DropdownItem><Link to='/managerlist' >Managers</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    {/* <a class="logo">Menu</a>
                        <ul>
                        <li><a href="flight_list.html">Flights</a></li>
                        <li><a href="boarding_check_list.html">Boarding checks</a></li>
                        <li><a href="user_list.html">Clients</a></li>
                        <li><a href="manager_list.html">Managers</a></li>
                    </ul> */}
                </li>
        )
    }

    const renderSearch = (pathname) => {
        return (
            pathname === '/' || pathname === '/login' || pathname === '/registration' ?
                <></>
                : <form>
                    <input type="text" placeholder="Search..." size="1" />
                    <button className="go-button" type="submit">Go</button>
                </form>
        )
    }

    const renderUserMenu = (pathname) => {
        switch (pathname) {
            case '/':
                return (
                    <ul className="login-register">
                        <li><Link to='/login' classNameName="link">Login</Link></li>
                        <li><Link to='/registration' classNameName="link">Register</Link></li>
                    </ul>
                )
            case '/registration':
                return (
                    <ul className="login-register">
                        <li><Link to='/login' classNameName="link">Login</Link></li>
                    </ul>
                )
            case '/login':
                return (
                    <ul className="login-register">
                        <li><Link to='/registration' classNameName="link">Register</Link></li>
                    </ul>
                )
            default:
                return(
                    <ul className="login-register">
                    <li><Link to={`/manager/${localStorage.getItem('id')}`} className="details"><img src="user.svg"/></Link></li>
                    </ul>
                )
        }
    }

    return (
        <nav className="search-bar">
            <ul>
                {renderLogo(location.pathname)}
                {renderMenu(location.pathname)}
            </ul>
            {renderSearch(location.pathname)}
            {renderUserMenu(location.pathname)}

        </nav>
    )
}