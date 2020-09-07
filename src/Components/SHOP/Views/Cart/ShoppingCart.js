import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBIcon,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTooltip
} from 'mdbreact';
import inputPage from "./QTY/QtyChanger";

class shoppingCart extends React.Component{

    constructor() {
        super();
        this.state = {
            // add data to the row using constructor
            data: [
                {
                    src: "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg",
                    title: "iPhone",
                    subTitle: "Applenkvbdsvljgdfdfdf",
                    brand: "Whitexfcxcxc",
                    price: "800",
                    qty: "1"
                },


            ],


            //coulomns declare here
            columns: [
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
                    label: <strong>Amount</strong>,
                    field: 'amount'
                },
                {
                    label: '',
                    field: 'button'
                }

            ]
        }

        // this.QtyFunction=this.QtyFunction.bind(this);

    }

    // QtyFunction=()=>{
    //     this.setState({ qty: this.state.qty + 1 });
    //     this.setState({ amount: this.state.qty * this.price });
    //
    //
    // }



    render() {

        const rows = [];
        const { columns, data } = this.state;

        data.map(row => {
            return rows.push(
                {
                    'img': <img src={row.src} alt="" className="img-fluid z-depth-10" />,
                    'product': [<h6 className="mt-3" key={new Date().getDate + 1}><strong>{row.title}</strong></h6>, <p key={new
                    Date().getDate} className="text-muted">{row.subTitle}</p>],
                    'brand': row.brand,
                    'price': `$${row.price}`,
                    'qty':
                         <MDBInput type="number"  default={row.qty} className="form-control"style={{ width: "50px " ,height:"50px" ,backgroundColor:"transparent"}} />,

                    'amount': <strong>${row.qty * row.price}</strong>,
                    'button':
                        <MDBTooltip placement="top">
                            <MDBBtn color="danger" size="sm">
                                <MDBIcon icon="trash" />
                            </MDBBtn>
                            <div>Remove item</div>
                        </MDBTooltip>
                }
            )
        });

        return (
            <div>
                <MDBRow center={true}>
                    <MDBCard style={{ width: "55rem", marginTop: "3rem" }} >
                        <MDBCardBody>
                            <MDBTable className="product-table" striped hover responsive>
                                <caption>List of Cart items</caption>
                                <MDBTableHead  style={{backgroundColor:"rgba(28,26,26,0.56)",color:"white",fontFamily:"sans-serif"}} columns={columns} />
                                <MDBTableBody rows={rows} />
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>


                <MDBRow center={true} >
                    <MDBCard style={{ width: "55rem" }} >
                        <MDBCardBody style={{backgroundColor:"rgba(57,56,56,0.53)",width:"100%"}}>
                            <MDBTable>
                                <tbody>
                                <tr>
                                    <td>Total Amount:</td>
                                    <td>#####</td>
                                    <td> <MDBBtn  color="warning" style={{width:"70%",color:"white",borderRadius:"10px"}} ><MDBIcon far icon="credit-card" style={{color:"white"}}/> Pay Now </MDBBtn></td>
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

export default shoppingCart;