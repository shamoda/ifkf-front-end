import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBIcon
} from 'mdbreact';
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import moment from "moment";


class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productname: '',
            id: this.props.match.params.id,
            brand: '',
            email: '',
            description: '',
            // products:''
            tot: this.props.match.params.tot,
            value: this.props.match.params.value,
            image: '',
            imageURL: ' ',
            imageName: ' ',
            Address: ' ',
            imageURLValidation: false,
            date_create: ''

        }


        // this.refreshProducts=this.refreshProducts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeemail = this.handleChangeemail.bind(this);
        this.handleChangeBrandName = this.handleChangeBrandName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.refreshProduct = this.refreshProduct.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.getDateandTime = this.getDateandTime.bind(this);

    }

    componentDidMount() {
        this.refreshProduct();
    }

    refreshProduct() {
        if (this.state.id == -1) {
            return
        }
        axios.get('http://localhost:8080/productController/getDetails/' + this.state.id).then(response => {
            console.log(this.state.id)
            this.setState({

                id: this.state.id,
                productname: response.data.productname,
                brand: response.data.brand,
                picture: response.data.picture,
                catogeory: response.data.catogeory,
                price: this.state.tot,
                qty: this.state.qty,
                description: response.data.description,


            });

        }).catch(function (error) {
            console.log(error);
        })

    }

    handleChangeProductName(event) {
        this.setState({productname: event.target.value});
    }

    handleChangeID(event) {
        this.setState({id: event.target.value});
    }

    handleChangeemail(event) {
        this.setState({email: event.target.value});
    }

    handleChangeBrandName(event) {
        this.setState({brand: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeQty(event) {
        this.setState({value: event.target.value});
    }

    handleChangePrice(event) {
        this.setState({price: event.target.value});
    }

    handleChangeAddress(event) {
        this.setState({Address: event.target.value});
    }


    async handleSubmit(event) {


        event.preventDefault();
        let formData = new FormData();
        formData.append('productname', this.state.productname);
        formData.append('id', this.state.id);
        formData.append('brand', this.state.brand);
        formData.append('email', this.state.email);
        formData.append('description', this.state.description);
        // formData.append('file', this.state.image);
        formData.append('total', this.state.tot);
        formData.append('Address', this.state.Address);
        formData.append('Qty', this.state.value);
        formData.append('purchase_date', this.state.date_create);


        console.log('ssssssssssss')
        console.log(this.state.date_create)


        Swal.fire({
            title: 'Order Confimation',
            text: "You won't be able to revert this!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#f6b102',
            cancelButtonColor: '#d33',
            confirmButtonText: ' Confirm Now'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Purchased!',
                    'Your ordered item.',
                    'success',
                    axios.post(`http://localhost:8080/OrderController/Order`, formData),
                    axios.post(`http://localhost:8080/CartController/deleteItem/` + this.state.id),
                    this.refreshProduct(),
                )
            }
        })


    }

    onchangeFile(e) {


        if (e.target.files.length) {
            this.setState({
                image: e.target.files[0],
                imageUrl: URL.createObjectURL(e.target.files[0]),
                imageName: e.target.files[0].name,
                imageURLValidation: true,
            });
        }


    }

    removePhoto() {
        this.setState({
            image: ' ',
            imageUrl: ' ',
            imageURLValidation: false,
            imageName: ' '
        })

    }

    getDateandTime() {
        this.setState({date_create: moment().format("DD-MM-YYYY hh:mm:ss")})
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow className={"justify-content-center"}>
                        <MDBCol size={8}>
                            <MDBCard style={{marginTop: "1rem"}}>
                                <MDBCardHeader className="text-center"
                                               style={{backgroundColor: "gray", color: "white"}}>Payment</MDBCardHeader>
                                <MDBCardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <MDBRow center={true}>
                                            <MDBCol size="4">

                                                <img src={`data:image/jpeg;base64,${this.state.picture}`} alt=""
                                                     className="img-fluid z-depth-10"/>

                                            </MDBCol>
                                        </MDBRow>
                                        {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                                        <MDBRow center={true}>

                                            <MDBCol md="10">

                                                {/*<p className="h4 text-center mb-4"></p>*/}
                                                <label htmlFor="productname" className="grey-text ">
                                                    Product name
                                                </label>
                                                <input type="text" id="productname" name="productname"
                                                       className="form-control" value={this.state.productname}
                                                       onChange={this.handleChangeProductName} disabled/>
                                                <br/>
                                                <label htmlFor="productId" className="grey-text">
                                                    Product ID
                                                </label>
                                                <input type="text" id="productId" name="id" className="form-control"
                                                       value={this.state.id}
                                                       onChange={this.handleChangeID} required={true} disabled/>
                                                <br/>
                                                <label htmlFor="qty" className="grey-text">
                                                    Qty
                                                </label>
                                                <input type="text" id="qty" name="qty" className="form-control"
                                                       value={this.state.value}
                                                       onChange={this.handleChangeQty} required={true} disabled/>
                                                <br/>
                                                <label htmlFor="productPrice" className="grey-text">
                                                    Total
                                                </label>
                                                <input type="" id="productPrice" name="price" className="form-control"
                                                       value={this.state.tot}
                                                       onChange={this.handleChangePrice} disabled/>
                                                <br/>
                                                <label htmlFor="brand" className="grey-text">
                                                    Brand
                                                </label>
                                                <input type="" id="brand" name="brand" className="form-control"
                                                       value={this.state.brand}
                                                       onChange={this.handleChangeBrandName} disabled/>
                                                <br/>

                                                <label htmlFor="description" className="grey-text">
                                                    Description
                                                </label>
                                                <textarea type="text" id="description" name="description"
                                                          className="form-control" rows="3"
                                                          value={this.state.description}
                                                          onChange={this.handleChangeDescription} disabled/>
                                                <label htmlFor="email" className="grey-text">
                                                    E-mail
                                                </label>
                                                <input type="email" id="email" name="email" className="form-control"
                                                       value={this.state.email}
                                                       onChange={this.handleChangeemail}/>

                                                <br/>
                                                <label htmlFor="catogeory" className="grey-text">
                                                    Address
                                                </label>
                                                <textarea type="text" id="Address" name="Address"
                                                          className="form-control" rows="3" value={this.state.Address}
                                                          onChange={this.handleChangeAddress}/>

                                                <div className="text-center mt-4">
                                                    <MDBBtn color="warning" type="submit"
                                                            onClick={this.getDateandTime}>Pay</MDBBtn>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }


}


export default Payment;