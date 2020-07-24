import React, { Component } from 'react';
import logo from '../../Assets/logo.png';
import './Header.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faUserCircle, faUsers, faChartLine, faSignInAlt, faSignOutAlt, faCalendarAlt, faHandshake,faBars, faImages, faPencilRuler, faCalendarCheck, faCheck, faShoppingBag, faCreditCard } from '@fortawesome/free-solid-svg-icons'


class Header extends Component {
    state = {  }
    render() { 

        const isUserLoggedIn = true//AuthenticationService.isUserLoggedIn();
        const loggedAsOperator = true
        //const loggedAsInstructor = true
        //const loggedAsStudent = true

        return ( 

            <div>
                    
                    <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand className="long_text" href="/" style={{color: "white", fontWeight: 500, fontSize:24 }}><img src={logo} width="60" height="60" alt="IFKF-SL logo" /> International Fumonkai Karate-do Federation - Sri Lanka</Navbar.Brand>
                    <Navbar.Brand className="short_text" href="/" style={{color: "white", fontWeight: 500, fontSize:24 }}><img src={logo} width="60" height="60" alt="IFKF-SL logo" /> IFKF - Sri Lanka</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link href="/"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                        <Nav.Link href="History"><FontAwesomeIcon icon={faBook} /> History</Nav.Link>
                        <Nav.Link href="gallery"><FontAwesomeIcon icon={faImages} /> Gallery</Nav.Link>
                        <Nav.Link href="events"><FontAwesomeIcon icon={faCalendarCheck} /> Events</Nav.Link>
                        <Nav.Link href="getintouch"><FontAwesomeIcon icon={faHandshake} /> Get in touch</Nav.Link>
                        {loggedAsOperator && <NavDropdown title={<FontAwesomeIcon icon={faBars} />} style={{marginRight:100}} id="basic-nav-dropdown"> 
                            <NavDropdown.Item href="users"><FontAwesomeIcon icon={faUsers} /> Users</NavDropdown.Item>
                            <NavDropdown.Item href="sessions"><FontAwesomeIcon icon={faCalendarAlt} /> Sessions</NavDropdown.Item>
                            <NavDropdown.Item href="performance"><FontAwesomeIcon icon={faChartLine} /> Performance</NavDropdown.Item>
                            <NavDropdown.Item href="equipments"><FontAwesomeIcon icon={faPencilRuler} /> Equipments</NavDropdown.Item>
                            <NavDropdown.Item href="events"><FontAwesomeIcon icon={faCalendarCheck} /> Events</NavDropdown.Item>
                            <NavDropdown.Item href="attendance"><FontAwesomeIcon icon={faCheck} /> Attendance</NavDropdown.Item>
                            <NavDropdown.Item href="shop"><FontAwesomeIcon icon={faShoppingBag} /> Shop</NavDropdown.Item>
                            <NavDropdown.Item href="payments"><FontAwesomeIcon icon={faCreditCard} /> Payments</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="update"><FontAwesomeIcon icon={faUserCircle} /> Update</NavDropdown.Item>
                        </NavDropdown>}

                        {/* {loggedAsInstructor && <NavDropdown title={<FontAwesomeIcon icon={faBars} />} style={{marginRight:100}} id="basic-nav-dropdown"> 
                            <NavDropdown.Item href="users"><FontAwesomeIcon icon={faUsers} /> Users</NavDropdown.Item>
                            <NavDropdown.Item href="performance"><FontAwesomeIcon icon={faChartLine} /> Performance</NavDropdown.Item>
                            <NavDropdown.Item href="events"><FontAwesomeIcon icon={faCalendarCheck} /> Events</NavDropdown.Item>
                            <NavDropdown.Item href="attendance"><FontAwesomeIcon icon={faCheck} /> Attendance</NavDropdown.Item>
                            <NavDropdown.Item href="shop"><FontAwesomeIcon icon={faShoppingBag} /> Shop</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="update"><FontAwesomeIcon icon={faUserCircle} /> Update</NavDropdown.Item>
                        </NavDropdown>} */}

                        {/* {loggedAsStudent && <NavDropdown title={<FontAwesomeIcon icon={faBars} />} style={{marginRight:100}} id="basic-nav-dropdown"> 
                            <NavDropdown.Item href="performance"><FontAwesomeIcon icon={faChartLine} /> Performance</NavDropdown.Item>
                            <NavDropdown.Item href="shop"><FontAwesomeIcon icon={faShoppingBag} /> Shop</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="update"><FontAwesomeIcon icon={faUserCircle} /> Update</NavDropdown.Item>
                        </NavDropdown>} */}
                        {!isUserLoggedIn && <Nav.Link href="login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>}
                        {isUserLoggedIn && <Nav.Link href="logout"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>


            </div>


         );
    }
}
 
export default Header;