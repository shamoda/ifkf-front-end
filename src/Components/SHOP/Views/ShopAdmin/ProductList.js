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

import axios from "axios";
import Loader from 'react-loader-spinner';

class productList extends React.Component {

    constructor() {
        super();

        this.state = {
            // add data to the row using constructor\

            Product: [],
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
    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get( 'http://localhost:8080/productController/getAll').then(response => {

            this.setState({
                Product: response.data
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {

        const rows = [];
        const {columns, Product} = this.state;

        {
                Product.map(row => {
                    console.log(row);
                    // const base64String = btoa(new Uint8Array(row.picture).reduce(function (data, byte) {
                    //     return data + String.fromCharCode(byte);
                    // }, ''));
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
                            'price': `$${row.price}`,
                            'qty': row.qty,
                            'button':
                                <MDBTooltip placement="top">
                                    <MDBBtn color="danger" size="sm">
                                        <MDBIcon icon="trash"/>
                                    </MDBBtn>
                                    <div>Remove item</div>
                                </MDBTooltip>,
                            'buttonEdit':
                                <MDBTooltip placement="top">
                                    <MDBBtn color="info" size="sm">
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
                    <MDBCard style={{width: "60rem", marginTop: "2rem"}}>
                        <MDBCardBody>
                            <MDBTable className="product-table" striped hover responsive>
                                <caption>List of All Product</caption>
                                <MDBTableHead stye={{
                                    backgroundColor: "rgba(28,26,26,0.56)",
                                    color: "white",
                                    fontFamily: "sans-serif"
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