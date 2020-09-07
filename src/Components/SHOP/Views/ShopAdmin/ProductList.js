import React, {Component, Fragment} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBContainer, MDBIcon,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTooltip
} from 'mdbreact';
// import * as axios from "../../../../js/mdb.min";
import * as axios from "axios";

class productList extends React.Component {

    constructor() {
        super();

        this.state = {
            // add data to the row using constructor\

            Product:[],
            data:[
                {
                            // id: Product.,
                            // src: "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg",
                            // title: "iPhone",
                            // subTitle: "Applenkvbdsvljgdfdfdf",
                            // brand: "Whitexfcxcxc",
                            // price: "800",
                            // qty: "1"


            }],

            // data: [
            //     {
            //         id: "1",
            //         src: "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg",
            //         title: "iPhone",
            //         subTitle: "Applenkvbdsvljgdfdfdf",
            //         brand: "Whitexfcxcxc",
            //         price: "800",
            //         qty: "1"
            //     },
            // ],



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

    // QtyFunction=()=>{
    //     this.setState({ qty: this.state.qty + 1 });
    //     this.setState({ amount: this.state.qty * this.price });
    //
    //
    // }

    getAllProducts() {
        axios.get(`http://localhost:8080/getAll`).then(response => {
            this.setState({Product: response.data});


        }).catch(function (error) {
            console.log(error);
        })

    }


    render() {

        const rows = [];
        const {columns, data} = this.state;

        data.map(row => {
            return rows.push(
                {
                    'id': row.id,
                    'img': <img src={row.src} alt="" className="img-fluid z-depth-10"/>,
                    'product': [<h6 className="mt-3" key={new Date().getDate + 1}><strong>{row.title}</strong></h6>,
                        <p key={new
                        Date().getDate} className="text-muted">{row.subTitle}</p>],
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

        return (
            <div>
                <MDBRow center={true}>
                    <MDBCard style={{width: "55rem", marginTop: "3rem"}}>
                        <MDBCardBody>
                            <MDBTable className="product-table" striped hover responsive>
                                <caption>List of All Product</caption>
                                <MDBTableHead style={{
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