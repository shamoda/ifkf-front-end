import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBRow,
    MDBTooltip,
} from 'mdbreact';
import './item.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import {withRouter} from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Swal from "sweetalert2";
import AuthenticationService from "../../../Authentication/AuthenticationService";


class EcommercePage extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            id:'',
            Product: [],
            customerId:AuthenticationService.loggedUserId(),
            repeat:'',

        }

        // this.getAllProducts = this.getAllProducts.bind(this);
        this.buyBytnclicked = this.buyBytnclicked.bind(this);
        this.getAllProductsFromProduct = this.getAllProductsFromProduct.bind(this);

    }

    componentDidMount() {

        // this.getAllProducts();
        this.getAllProductsFromProduct();

    }

    buyBytnclicked(id){
        console.log(id)
        console.log(this.state.customerId)

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Check the Cart ,Successfully Added',
            showConfirmButton: false,
            timer: 1500
        })

        axios.post(`http://localhost:8080/CartController/CartItems/${id}/${this.state.customerId}`);
        axios.post('http://localhost:8080/CartController/saveCustomer/'+this.state.customerId);
        console.log("current user"+this.state.customerId)





    }

    getAllProductsFromProduct() {
        axios.get('http://localhost:8080/productController/getAll').then(response => {

            this.setState({
                Product: response.data,
                id:response.data.id,
            });
        }).catch(function (error) {
            console.log(error);
        })
    }






    render() {
        return (

            <MDBContainer>
                <MDBRow className={"py-5" }>
                    {this.state.Product.map( item =>



                        <div className={"col-4"}>
                            {/*heading*/}
                            {/*<h2 className='h1-responsive font-weight-bold text-center my-5'></h2>*/}
                            <MDBCard narrow ecommerce className="mb-5 cardStyle"  style={{width:'18rem',borderRadius:'2px', boxShadow:'2px 1px 10px rgba(0,0,0,0.5'}}>

                                {/*image */}
                                <MDBCardImage className={"p-2"}
                                    cascade
                                    top
                                    src={`data:image/jpeg;base64,${item.picture}`}
                                    alt='sample photo'
                                />

                                {/*body start here*/}
                                <MDBCardBody >
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
                                <div className={"p-3 mx-2"} style={{backgroundColor:'#dedede', borderRadius:'5px'}}>
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

                                <button type="button" className="btn btn-outline-warning waves-effect m-2" onClick={this.buyBytnclicked.bind(this,item.id)} ><i
                                    className='black-text fa fa-briefcase mr-3'  />BUY NOW
                                </button>
                            </MDBCard>
                        </div>
                    )}
                </MDBRow>
            </MDBContainer>



        );
    }

}

export default withRouter(EcommercePage) ;