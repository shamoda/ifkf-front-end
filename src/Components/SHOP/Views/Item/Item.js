import React, {Component} from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBTooltip,
    MDBContainer, MDBBtn, MDBIcon,
} from 'mdbreact';

import './item.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";


class EcommercePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            Product: [],

        }

        this.getAllProducts = this.getAllProducts.bind(this);
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


    render() {
        return (
            <MDBContainer>
                <MDBRow className={"py-5" }>
                    {this.state.Product.map( item =>
                        <div className={"col-4"}>
                            {/*heading*/}
                            {/*<h2 className='h1-responsive font-weight-bold text-center my-5'></h2>*/}
                            <MDBCard narrow ecommerce className="mb-5 cardStyle" key={item.id} style={{width:'18rem',borderRadius:'2px', boxShadow:'2px 1px 10px rgba(0,0,0,0.5'}}>

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

                                <button type="button" className="btn btn-outline-warning waves-effect m-2"><i
                                    className='black-text fa fa-briefcase mr-3'/>BUY NOW
                                </button>
                            </MDBCard>
                        </div>
                    )}
                </MDBRow>
            </MDBContainer>



            // this.state.Product.map(item => {
            //     console.log(item)
            //
            //
            //     return (
            //
            //             <MDBContainer>
            //
            //                 {/*heading*/}
            //                 <h2 className='h1-responsive font-weight-bold text-center my-5'></h2>
            //
            //                 {/*start item*/}
            //                 <MDBRow  >
            //                     <MDBCol >
            //
            //
            //
            //                     </MDBCol>
            //                     {/*end of item card*/}
            //                 </MDBRow>
            //                 {/*ist row eke end eka*/}
            //
            //             </MDBContainer>
            //
            //
            //     )
            //
            //
            // })

        );
    }

}

export default EcommercePage;