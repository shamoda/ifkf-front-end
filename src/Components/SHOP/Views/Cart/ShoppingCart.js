import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTooltip
} from 'mdbreact';
import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';js

import axios from "axios";
import swal from "sweetalert";
import QTY from "./Qtychanger";
import * as Swal from "sweetalert2";
import AuthenticationService from "../../../Authentication/AuthenticationService";


class ShoppingCart extends React.Component {

    // value:this.props.match.params.value


    constructor(props) {
        super(props);

        this.state = {
            // add data to the row using constructor\
            Id: [],
            id: '',
            brand: '',
            productname: '',
            qty: '',
            price: '',
            Product: [],
            data: [],
            value: 1,
            total: '',
            id1:AuthenticationService.loggedUserId(),

            //coulomns declare here
            columns: [
                {
                    label: 'ProductID',
                    field: 'id',
                },

                {
                    label: '',
                    field: 'img',
                },
                {
                    label: <strong>Product</strong>,
                    field: 'product'
                },
                {
                    label: <strong>Brand</strong>,
                    field: 'brand'
                },
                {
                    label: <strong>Price</strong>,
                    field: 'price'
                },
                {
                    label: <strong>QTY</strong>,
                    field: 'qty'
                },
                {
                    label: '',
                    field: 'button'
                },

            ]
        }


        this.deleteItem = this.deleteItem.bind(this);
        this.getCartItemsbyId = this.getCartItemsbyId.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.PaynowBtnClicked = this.PaynowBtnClicked.bind(this);

        console.log(this.value)

    }

    componentDidMount() {
        this.getCartItemsbyId();


    }


    getCartItemsbyId() {


        axios.get('http://localhost:8080/CartController/GetCartItems/'+this.state.id1).then(response => {

            this.setState({
                Product: response.data,

            });


        }).catch(function (error) {
            console.log(error);

        })



    }

    deleteItem(id) {

        console.log(id)
        // swal({
        //     title: "Are you sure?",
        //     text: "Once deleted, you will not be able to recover this imaginary file!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // })
        //     .then((willDelete) => {
        //         if (willDelete) {
        //             axios.delete('http://localhost:8080/CartController/deleteItem/' + id).then(response => {
        //                 this.getCartItemsbyId();
        //
        //             })
        //             swal("Poof! Your imaginary file has been deleted!", {
        //                 icon: "success",
        //
        //
        //             });
        //         } else {
        //             swal("Your imaginary file is safe!");
        //         }
        //     });
//
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                axios.delete('http://localhost:8080/CartController/deleteItem/' + id).then(response => {
                    this.getCartItemsbyId();

                })




                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })






    }

    getTotal() {
        this.setState
        ({total: this.state.price * this.state.value});


    }


    PaynowBtnClicked(id, qty, price, value) {
        console.log(id)
        console.log(qty)
        console.log(price)
        console.log(value)

        const tot = price * value;

        console.log(tot)

        this.props.history.push(`/Payment/${id}/${tot}/${value}`)
        // this.props.history.push(`/Payment/${value}`)


    }

    decrease = () => {
        // console.log(this.state.value)
        this.setState({value: this.state.value - 1});

        if (this.state.value <= 0) {
            swal('qty cant be negative')
            // this.state.value=1;
            this.setState({value: 1});
        }

    }


    increase = () => {
        // console.log(this.state.value)
        this.setState({value: this.state.value + 1});

    }

    render() {

        const rows = [];
        const total = [];
        const {columns, Product} = this.state;

        return Product.map((Product) =>

            <div key={Product.id}>

                <MDBRow center={true}>

                    <MDBCard style={{width: "75rem", marginTop: "2rem"}}>
                        <MDBCardBody>
                            <MDBTable className="product-table" striped hover responsive>
                                <caption>List of All Product</caption>
                                <MDBTableHead style={{
                                    backgroundColor: "rgba(28,26,26,0.56)",
                                    color: "white",
                                    fontFamily: "sans-serif"
                                }} columns={columns}/>
                                <MDBTableBody>
                                    <tr>
                                        <td>{Product.id}</td>
                                        <td><img src={`data:image/jpeg;base64,${Product.picture}`} alt=""
                                                 className="img-fluid z-depth-10"/></td>
                                        <td><h6 className="mt-3" key={new Date().getDate + 1}>
                                            <strong>{Product.productname}</strong>
                                        </h6>
                                            <p key={new
                                            Date().getDate} className="text-muted">{Product.description}</p>
                                        </td>
                                        <td>{Product.brand}</td>
                                        <td>{Product.price}</td>
                                        <td>
                                            {/*<QTY/>*/}
                                            <div className="def-number-input number-input">
                                                <button onClick={this.decrease} className="minus"></button>
                                                <input className="quantity" name="quantity" value={this.state.value}
                                                       type="number"/>
                                                <button onClick={this.increase} className="plus"></button>
                                            </div>
                                        </td>
                                        <td>
                                            <MDBTooltip placement="top">

                                                <MDBBtn color="danger" size="sm"
                                                        onClick={this.deleteItem.bind(this, Product.qty)}>
                                                    <MDBIcon icon="trash"/>
                                                </MDBBtn>

                                                <div>Remove item</div>
                                            </MDBTooltip>
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
                <MDBRow center>
                    <MDBCard style={{width: "75rem"}}>
                        <MDBCardBody style={{
                            backgroundColor: "rgba(57,56,56,0.53)",
                            width: "100%"
                        }}>
                            <MDBTable>
                                <tbody>
                                <tr>
                                    <td>Total Amount:</td>
                                    <td>{this.state.value * Product.price}</td>
                                    <td>

                                    </td>
                                    <td><MDBBtn
                                        onClick={this.PaynowBtnClicked.bind(this, Product.id, Product.qty, Product.price, this.state.value)}
                                        color="warning"
                                        style={{
                                            width: "70%",
                                            color: "white",
                                            borderRadius: "10px"
                                        }}><MDBIcon
                                        far icon="credit-card"
                                        style={{color: "white"}}/> Pay Now </MDBBtn>
                                    </td>
                                </tr>
                                </tbody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </div>
        );


    }
}


export default ShoppingCart;