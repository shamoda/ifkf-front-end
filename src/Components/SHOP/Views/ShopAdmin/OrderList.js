import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBIcon, MDBNavLink,
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

import jsPDF from 'jspdf'; import 'jspdf-autotable';
import moment from "moment";



class OrderList extends React.Component {


    constructor() {
        super();

        this.state = {
            // add data to the row using constructor\

            Order: [],
            order_id: '',
            product_id: '',
            productname: '',
            email: '',
            total_amount: '',
            descriptions: '',
            address: '',
            brand: '',
            purchase_date: '',
            resultArray: [],


            //coulomns declare here
            columns: [
                {
                    label: <strong>OrderID</strong>,
                    field: 'order_id',
                },
                {
                    label: <strong>Product_Id</strong>,
                    field: 'product_id',
                },
                {
                    label: <strong>Product</strong>,
                    field: 'productname'
                },
                {
                    label: <strong>Brand</strong>,
                    field: 'brand'
                },
                {
                    label: <strong>Amount</strong>,
                    field: 'amount'
                },
                {
                    label: <strong>QTY</strong>,
                    field: 'amount'
                },
                {
                    label: <strong>Details</strong>,
                    field: 'detalis'
                },
                {
                    label: <strong>Purchase_date</strong>,
                    field: 'date'
                },
                {
                    label: '',
                    field: 'button'
                },
            ]
        }
        this.getAllProducts = this.getAllProducts.bind( this );
        this.deleteItem = this.deleteItem.bind( this );
        this.updateBtnclicked = this.updateBtnclicked.bind( this );
        // this.generateReport = this.generateReport.bind(this);
        // this.GetItems = this.GetItems.bind(this);
    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get( 'http://localhost:8080/OrderController/getAll' ).then( response => {

            this.setState( {
                Order: response.data


            } );
        } ).catch( function (error) {
            console.log( error );
        } )
    }

    exportPDF = () => {
        console.log( "SSSSSSSSSS" )


        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF( orientation, unit, size );

        // const jsPDF = require('jspdf');
        // require('jspdf-autotable');

        const title = "IFKF SHOP-Order Report ";
        const headers = [["Order ID","Product_Id","Product","Brand","Amount","QTY", "Details(email)","Details(Address)", "Purchase_date"]];

        const Order = this.state.Order.map( orderList => [orderList.order_id, orderList.product_id,orderList.productname,orderList.brand, orderList.total_amount, orderList.qty,orderList.email,orderList.address,orderList.purchase_date] );

        let content = {
            startY: 50,
            head: headers,
            body: Order
        };
        doc.setFontSize( 20 );
        doc.text( title, marginLeft, 40 );
        require('jspdf-autotable');
        doc.autoTable( content );
        doc.save( "IFKF_Shop_Order_Report "+moment().format("DD-MM-YYYY hh:mm:ss")+".pdf" )
    }


    deleteItem(id) {
        // console.log(id);
        swal( {
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        } )
            .then( (willDelete) => {
                if (willDelete) {
                    axios.delete( 'http://localhost:8080/OrderController/deleteItem/' + id ).then( response => {
                        this.getAllProducts();

                    } )
                    swal( "Poof! Your imaginary file has been deleted!", {
                        icon: "success",


                    } );
                } else {
                    swal( "Your imaginary file is safe!" );
                }
            } );


    }

    updateBtnclicked(id) {
        this.props.history.push( `/EditItem/${id}` )

    }


    render() {

        const rows = [];
        const {columns, Order} = this.state;

        {
            Order.map( row => {
                console.log( row );
                return rows.push(
                    {
                        'o_id': row.order_id,
                        'product_id': row.product_id,

                        'product': [<h6 className="mt-3" key={new Date().getDate + 1}><strong>{row.product_id}</strong>
                        </h6>,
                            <p key={new
                            Date().getDate} className="text-muted">{row.descriptions}</p>],
                        'brand': row.brand,
                        'amount': `Rs.${row.total_amount}`,
                        'QTY': row.qty,
                        'details': [<h6 className="mt-3" key={new Date().getDate + 1}><strong>{row.email}</strong>
                        </h6>,
                            <p key={new
                            Date().getDate} className="text-muted">{row.address}</p>],
                        'date': row.purchase_date,
                        'button':
                            <MDBTooltip placement="top">

                                <MDBBtn color="danger" size="sm" onClick={this.deleteItem.bind( this, row.order_id )}>
                                    <MDBIcon icon="trash"/>
                                </MDBBtn>

                                <div>Remove item</div>
                            </MDBTooltip>,


                    }
                )
            } );
        }


        return (
            <div>
                <MDBRow center={true} >
                    <MDBCard style={{width: "82rem", marginTop: "2rem"}}>
                        <MDBBtn color={"warning"} style={{color: 'white'}} onClick={() => this.exportPDF()}><MDBIcon far icon="file-pdf" /> Genrate A Report</MDBBtn>
                        <MDBCardBody>
                            <MDBTable className="product-table" striped hover responsive>
                                <caption>List of All Product</caption>
                                <MDBTableHead columns={columns}/>
                                <MDBTableBody rows={rows}/>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </div>
        );
    }


}

export default OrderList;