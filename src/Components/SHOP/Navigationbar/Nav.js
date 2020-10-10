import React, {Component} from "react";
// import {
//     MDBNavbar,MDBNav, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
//     MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
// } from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { MDBNav } from "mdbreact";

// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import axios from "axios";
import {
    MDBAlert,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBRow,
    MDBTooltip
} from "mdbreact";


class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: false,
            Item: '',
            id: '',
            customerId: 'C001',//we need customer id to find the items
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    state = {
        isOpen: false

    };

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    handleSearch(event) {
        this.setState({search: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8080/productController/searchbyname/` + this.state.search)


            .then(res => {
                console.log(this.state.Product)
                this.setState({
                    Product: true,
                    Item: res.data,
                    id: res.data.id
                });


            }).catch(function (error) {
            console.log(error);
        })

    }

    buyBytnclicked(id) {
        console.log(id)
        console.log(this.state.customerId)
        axios.post(`http://localhost:8080/CartController/CartItems/${id}/${this.state.customerId}`);

    }

    render() {
        const {Product, id} = this.state


        let timerInterval
        // console.log("GGG"+this.state.Product)

        if (this.state.Product == false) {

            console.log("HHH")
            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/shop">Home</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>

                        <Nav><Nav.Link href="/ShoppingCart"><i className="fas fa-cart-plus"></i> CART</Nav.Link></Nav>

                        <Form inline onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleSearch}
                                   required={true}/>
                            <Button type="submit" variant="outline-info" size="sm">Search</Button>
                        </Form>
                    </Navbar>
                </div>

            );


        } else {

            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/shop">Home</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>

                        <Nav><Nav.Link href="/ShoppingCart"><i className="fas fa-cart-plus"></i> CART</Nav.Link></Nav>

                        <Form inline onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleSearch}
                                   required={true}/>
                            <Button type="submit" variant="outline-info" size="sm">Search</Button>
                        </Form>
                    </Navbar>

                    <MDBAlert color="warning" dismiss>
                        <strong>Searched Items </strong>Pick your items right now.
                    </MDBAlert>

                    <MDBContainer>
                        <MDBRow className={"py-5"}>
                            {this.state.Item.map(item =>


                                <div className={"col-4"}>
                                    {/*heading*/}
                                    {/*<h2 className='h1-responsive font-weight-bold text-center my-5'></h2>*/}
                                    <MDBCard narrow ecommerce className="mb-5 cardStyle" style={{
                                        width: '18rem',
                                        borderRadius: '2px',
                                        boxShadow: '2px 1px 10px rgba(0,0,0,0.5'
                                    }}>

                                        {/*image */}
                                        <MDBCardImage className={"p-2"}
                                                      cascade
                                                      top
                                                      src={`data:image/jpeg;base64,${item.picture}`}
                                                      alt='sample photo'
                                        />

                                        {/*body start here*/}
                                        <MDBCardBody>
                                            <a href='#!' className='text-muted'>
                                                <h5>{item.brand}</h5>
                                            </a>

                                            {/*title start here*/}
                                            <MDBCardTitle>
                                                <strong>
                                                    <a href='#!'>{item.productname}</a>
                                                </strong>
                                            </MDBCardTitle>
                                            <MDBCardText>{item.description}</MDBCardText>

                                        </MDBCardBody>
                                        <div className={"p-3 mx-2"}
                                             style={{backgroundColor: '#dedede', borderRadius: '5px'}}>
                                            <span className='float-left'>Rs:{item.price}</span>
                                            <span className='float-right'>

                                           {/*card footer items hart and eye */}
                                                <MDBTooltip domElement placement='top'>
                                              <i className='grey-text fa fa-eye mr-3'/>
                                              <span>Quick Look</span>
                                            </MDBTooltip>
                                            <MDBTooltip domElement placement='top'>
                                              <i className='grey-text fa fa-heart'/>
                                              <span>Add to Whishlist</span>

                                            </MDBTooltip>
                                        </span>
                                        </div>

                                        <button type="button" className="btn btn-outline-warning waves-effect m-2"
                                                onClick={this.buyBytnclicked.bind(this, item.id)}><i
                                            className='black-text fa fa-briefcase mr-3'/>BUY NOW
                                        </button>
                                    </MDBCard>
                                </div>
                            )}
                        </MDBRow>
                    </MDBContainer>
                    <hr></hr>
                </div>
            )


        }


    }


}

export default NavbarPage;