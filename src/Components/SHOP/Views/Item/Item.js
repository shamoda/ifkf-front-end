import React from 'react';
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
    MDBContainer,
} from 'mdbreact';

import './item.css'
import '@fortawesome/fontawesome-free/css/all.min.css';



const EcommercePage = () => {
    return (
        <MDBContainer>

            {/*heading*/}
            <h2 className='h1-responsive font-weight-bold text-center my-5'></h2>

            {/*start item*/}
            <MDBRow>
                <MDBCol md='4'>
                    <MDBCard narrow ecommerce className='mb-2'>

                        {/*image */}
                        <MDBCardImage
                            cascade
                            top
                            src='https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(39).jpg'
                            alt='sample photo'
                        />

                        {/*body start here*/}
                        <MDBCardBody cascade>
                            <a href='#!' className='text-muted'>
                                <h5>Shoes</h5>
                            </a>

                            {/*title start here*/}
                            <MDBCardTitle>
                                <strong>
                                    <a href='#!'>Leather boots</a>
                                </strong>
                            </MDBCardTitle>
                            <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                                adipisci.</MDBCardText>

                            <MDBCardFooter className='px-1'>
                                <span className='float-left'>69$</span>
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

                            </MDBCardFooter>

                        </MDBCardBody>
                        <button type="button" className="btn btn-outline-warning waves-effect"><i className='black-text fa fa-briefcase mr-3'/>BUY NOW</button>
                    </MDBCard>


                </MDBCol> <MDBCol md='4'>
                <MDBCard narrow ecommerce className='mb-2'>

                    {/*image */}
                    <MDBCardImage
                        cascade
                        top
                        src='https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(39).jpg'
                        alt='sample photo'
                    />

                    {/*body start here*/}
                    <MDBCardBody cascade>
                        <a href='#!' className='text-muted'>
                            <h5>Shoes</h5>
                        </a>

                        {/*title start here*/}
                        <MDBCardTitle>
                            <strong>
                                <a href='#!'>Leather boots</a>
                            </strong>
                        </MDBCardTitle>
                        <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                            adipisci.</MDBCardText>

                        <MDBCardFooter className='px-1'>
                            <span className='float-left'>69$</span>
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
                        </MDBCardFooter>
                    </MDBCardBody>
                    <button type="button" className="btn btn-outline-warning waves-effect"><i className='black-text fa fa-briefcase mr-3'/>BUY NOW</button>
                </MDBCard>
            </MDBCol> <MDBCol md='4'>
                <MDBCard narrow ecommerce className='mb-2'>

                    {/*image */}
                    <MDBCardImage
                        cascade
                        top
                        src='https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(39).jpg'
                        alt='sample photo'
                    />

                    {/*body start here*/}
                    <MDBCardBody cascade>
                        <a href='#!' className='text-muted'>
                            <h5>Shoes</h5>
                        </a>

                        {/*title start here*/}
                        <MDBCardTitle>
                            <strong>
                                <a href='#!'>Leather boots</a>
                            </strong>
                        </MDBCardTitle>
                        <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                            adipisci.</MDBCardText>

                        <MDBCardFooter className='px-1'>
                            <span className='float-left'>69$</span>
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
                        </MDBCardFooter>
                    </MDBCardBody>
                    {/*<button type="button" className="btn btn-amber btn-sm"> <i className='black-text fa fa-briefcase mr-3'/>BUY NOW</button>*/}
                    <button type="button" className="btn btn-outline-warning waves-effect"><i className='black-text fa fa-briefcase mr-3'/>BUY NOW</button>
                </MDBCard>
            </MDBCol>
                {/*end of item card*/}
            </MDBRow>
            {/*ist row eke end eka*/}

        </MDBContainer>
        //////////////////////////////////////////////////////////////////////////////////////////////////////////


    );







};

export default EcommercePage;