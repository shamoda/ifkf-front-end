import React, { Component } from "react";
import {
    MDBNavbar,MDBNav, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
// import { MDBNav } from "mdbreact";

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#">Home</Navbar.Brand>
                <Nav className="mr-auto">

                    <NavDropdown title="CLOTHING" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="#action/3.2">UNIFORM</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">SHOES</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.5">BAGS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">ACCESSORIES</NavDropdown.Item>
                    </NavDropdown>


                    <NavDropdown title="PROTECTION" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">MOUTH GUARDS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">HAND GUARDS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">GORING GUARDS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">KARATE GLOVES</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="#equipment">EQUIPMENT</Nav.Link>
                    <Nav.Link href="#books">BOOKS</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-info" size="sm">Search</Button>
                </Form>
            </Navbar>
        );
    }
}

export default NavbarPage;