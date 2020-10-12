import React, { Component } from 'react';
import logo from '../../Assets/logo.png';
import './Header.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faUserCircle, faUsers, faChartLine, faSignInAlt, faSignOutAlt, faCalendarAlt, faHandshake,faBars, faImages, faPencilRuler, faCalendarCheck, faCheck, faShoppingBag, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import AuthenticationService from '../Authentication/AuthenticationService';


class Header extends Component {
    state = {  }
    render() { 

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();

        let loggedAsOperator = false;
        let loggedAsInstructor = false;
        let loggedAsStudent = false;

        if(loggedUserRole != null && loggedUserRole === 'operator'){
            loggedAsOperator = true;
        }
        if(loggedUserRole != null && loggedUserRole === 'instructor'){
            loggedAsInstructor = true;
        }
        if(loggedUserRole != null && loggedUserRole === 'student'){
            loggedAsStudent = true;
        }
        

        return ( 

            <div>
                    
                    <Navbar bg="dark" variant="dark" expand="lg">
                    <Link className="navbar-brand long_text" to="/" style={{color: "white", fontWeight: 500, fontSize:24 }}><img src={logo} width="60" height="60" alt="IFKF-SL logo" /> International Fumonkai Karate-do Federation - Sri Lanka</Link>
                    <Link className="navbar-brand short_text" to="/" style={{color: "white", fontWeight: 500, fontSize:24 }}><img src={logo} width="60" height="60" alt="IFKF-SL logo" /> IFKF - Sri Lanka</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
                        <Link className="nav-link" to="/history"><FontAwesomeIcon icon={faBook} /> History</Link>
                        {/*<Link className="nav-link" to="gallery"><FontAwesomeIcon icon={faImages} /> Gallery</Link>*/}
                        <Link className="nav-link" to="/events"><FontAwesomeIcon icon={faCalendarCheck} /> Events</Link>
                        <Link className="nav-link" to="/getintouch"><FontAwesomeIcon icon={faHandshake} /> Get in touch</Link>
                        {loggedAsOperator && <NavDropdown title={<FontAwesomeIcon icon={faBars} />} style={{marginRight:100}} id="basic-nav-dropdown"> 
                            <Link className="dropdown-item" to="/users"><FontAwesomeIcon icon={faUsers} /> Users</Link>
                            <Link className="dropdown-item" to="/sessions"><FontAwesomeIcon icon={faCalendarAlt} /> Sessions</Link>
                            <Link className="dropdown-item" to="/studentperformance"><FontAwesomeIcon icon={faChartLine} /> Performance</Link>
                            <Link className="dropdown-item" to="/equipment"><FontAwesomeIcon icon={faPencilRuler} /> Equipments</Link>
                            <Link className="dropdown-item" to="/events/list"><FontAwesomeIcon icon={faCalendarCheck} /> Events</Link>
                            <Link className="dropdown-item" to="/attendanceList"><FontAwesomeIcon icon={faCheck} /> Attendance</Link>
                            <Link className="dropdown-item" to="/Admindashboard"><FontAwesomeIcon icon={faShoppingBag} /> Shop</Link>
                            <Link className="dropdown-item" to="/payments"><FontAwesomeIcon icon={faCreditCard} /> Payments</Link>
                            <NavDropdown.Divider />
                            <Link  className="dropdown-item" to="/update"><FontAwesomeIcon icon={faUserCircle} /> Update</Link>
                        </NavDropdown>}

                        {loggedAsInstructor && <NavDropdown title={<FontAwesomeIcon icon={faBars} />} style={{marginRight:100}} id="basic-nav-dropdown"> 
                            <Link className="dropdown-item" to="/users"><FontAwesomeIcon icon={faUsers} /> Users</Link>
                            <Link className="dropdown-item" to="/studentperformance"><FontAwesomeIcon icon={faChartLine} /> Performance</Link>
                            <Link className="dropdown-item" to="/events"><FontAwesomeIcon icon={faCalendarCheck} /> Events</Link>
                            <Link className="dropdown-item" to="/attendanceList"><FontAwesomeIcon icon={faCheck} /> Attendance</Link>
                            <Link className="dropdown-item" to="/shop"><FontAwesomeIcon icon={faShoppingBag} /> Shop</Link>
                            <Link className="dropdown-item" to="/payments"><FontAwesomeIcon icon={faCreditCard} /> Payments</Link>
                            <Link className="dropdown-item" to="/showDonations"><FontAwesomeIcon icon={faPencilRuler} /> Equipments</Link>
                            <NavDropdown.Divider />
                            <Link  className="dropdown-item" to="/update"><FontAwesomeIcon icon={faUserCircle} /> Update</Link>
                        </NavDropdown>}

                        {loggedAsStudent && <NavDropdown title={<FontAwesomeIcon icon={faBars} />} style={{marginRight:100}} id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/myperformance"><FontAwesomeIcon icon={faChartLine} /> Performance</Link>
                            <Link className="dropdown-item" to="/shop"><FontAwesomeIcon icon={faShoppingBag} /> Shop</Link>
                            <NavDropdown.Divider />
                            <Link  className="dropdown-item" to="/update"><FontAwesomeIcon icon={faUserCircle} /> Update</Link>
                        </NavDropdown>}

                        {!isUserLoggedIn && <Link className="nav-link" to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>}
                        {isUserLoggedIn && <Link className="nav-link" to="/login" onClick={AuthenticationService.logout} ><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>}
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>


            </div>


         );
    }
}
 
export default withRouter(Header);