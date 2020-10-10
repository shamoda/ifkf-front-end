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
import * as Swal from "sweetalert2";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import Loader from 'react-loader-spinner';


class productList extends React.Component {


    constructor() {
        super();

        this.state = {
            // add data to the row using constructor\

            Product: [],
            id: '',
            brand: '',
            productname: '',
            qty: '',
            price: '',
            searchclick: false,


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
                {
                    label: '',
                    field: 'buttonEdit'
                }
            ]
        }
        this.getAllProducts = this.getAllProducts.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateBtnclicked = this.updateBtnclicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get('http://localhost:8080/productController/getAll').then(response => {

            this.setState({
                Product: response.data


            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleSearch(event) {
        this.setState({search: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8080/productController/searchbyname/` + this.state.search)


            .then(response => {
                console.log(this.state.Product)
                this.setState({
                    searchclick: true,
                    Product: response.data
                });


            }).catch(function (error) {
            console.log(error);
        })

    }

    deleteItem(id) {
        // console.log(id);
        // swal({
        //     title: "Are you sure?",
        //     text: "Once deleted, you will not be able to recover this imaginary file!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // })
        //     .then((willDelete) => {
        //         if (willDelete) {
        //             axios.delete('http://localhost:8080/productController/deleteItem/'+id ).then( response => {
        //                 this.getAllProducts();
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


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'


        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                    axios.delete('http://localhost:8080/productController/deleteItem/' + id).then(response => {
                        this.getAllProducts();

                    })
                )
            } else {
                Swal.fire('Delete Canceled')

            }


        })

    }

    updateBtnclicked(id) {

        this.props.history.push(`/EditItem/${id}`)

    }


    render() {

        const rows = [];
        const {columns, Product} = this.state;

        {

            Product.map(row => {
                console.log(row);


                return rows.push(
                    {
                        'id': row.id,

                        'img': <img src={`data:image/jpeg;base64,${row.picture}`} alt=""
                                    className="img-fluid z-depth-10"/>,
                        'product': [<h6 className="mt-3" key={new Date().getDate + 1}><strong>{row.productname}</strong>
                        </h6>,
                            <p key={new
                            Date().getDate} className="text-muted">{row.description}</p>],
                        'brand': row.brand,
                        'price': `Rs.${row.price}`,
                        'qty': row.qty,
                        'button':
                            <MDBTooltip placement="top">

                                <MDBBtn color="danger" size="sm" onClick={this.deleteItem.bind(this, row.id)}>
                                    <MDBIcon icon="trash"/>
                                </MDBBtn>

                                <div>Remove item</div>
                            </MDBTooltip>,
                        'buttonEdit':
                            <MDBTooltip placement="top">

                                <MDBBtn color="info" size="sm" onClick={this.updateBtnclicked.bind(this, row.id)}>
                                    <MDBIcon far icon="edit"/>
                                </MDBBtn>

                                <div>Edit</div>
                            </MDBTooltip>


                    }
                )
            });
        }


        return (
            <div>


                <MDBRow center={true}>
                    <MDBCard style={{width: "75rem", marginTop: "2rem"}}>
                        <Navbar bg="dark" variant="dark">
                            <Nav className="mr-auto">
                            </Nav>
                            <Form inline onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleSearch}
                                       required={true}/>
                                <Button type="submit" variant="outline-info" size="sm">Search</Button>
                            </Form>
                        </Navbar>
                        <MDBBtn color={"warning"} style={{color: 'white'}} href='/AddItems'><i
                            className="fas fa-plus"></i> Add Product</MDBBtn>
                        <MDBCardBody>
                            <MDBTable className="product-table" striped hover responsive>
                                <caption>List of All Product</caption>
                                <MDBTableHead style={{
                                    backgroundColor: "rgba(28,26,26,0.56)",
                                    color: "white",
                                    fontFamily: "sans-serif",
                                    textAlign: 'center'
                                }} columns={columns}/>
                                <MDBTableBody rows={rows}/>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>


            </div>


        );
    }


}

export default productList;