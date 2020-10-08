import React, {Component} from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBContainer,
    MDBTypography, MDBIcon
}
    from 'mdbreact';
import {BrowserRouter as Router} from 'react-router-dom'
import Nav from "react-bootstrap/Nav";
import OrderList from "./OrderList";


class AdminDashboard extends Component {

    state = {
        collapseID: ''
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({collapseID: (prevState.collapseID !== collapseID ? collapseID : '')}));
    }
    componentDidMount() {
        // this.setState({test:1})
    }

    render() {
        return (


            <Router>

                <MDBTypography tag="h4" variant="display-4" className="text-center"> Admin Dashboard</MDBTypography>
                <hr></hr>

                <MDBContainer>
                    <MDBNavbar
                        style={{marginTop: '60px', backgroundColor: '#00000087', borderRadius: '10px', padding: '80px'}}
                        dark>
                        <MDBContainer>
                            <MDBNavbarBrand className="white-text">
                                <MDBIcon icon="wrench" /> Admin DashBoard
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse11')}/>
                            <MDBCollapse id="navbarCollapse11" isOpen={this.state.collapseID} navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem>
                                        <Nav><Nav.Link href="/AddItems">Add Products</Nav.Link></Nav>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <Nav><Nav.Link href="/ViewAll">View All Produts</Nav.Link></Nav>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <Nav><Nav.Link href="/OrderList">OrderList</Nav.Link></Nav>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>
                </MDBContainer>
            </Router>
        );
    }
}

export default AdminDashboard;