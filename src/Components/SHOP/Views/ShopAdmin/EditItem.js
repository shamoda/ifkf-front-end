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



class UploadItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productname: '',
            id: this.props.match.params.id,
            brand: '',
            catogeory: '',
            description: '',
            // products:''
            price:'',
            qty: 0,
            image: '',
            imageURL: ' ',
            imageName: ' ',
            imageURLValidation: false,
        }


        // this.refreshProducts=this.refreshProducts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeCatogory = this.handleChangeCatogory.bind(this);
        this.handleChangeBrandName = this.handleChangeBrandName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this. handleChangeQty = this. handleChangeQty.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.refreshProduct = this.refreshProduct.bind(this);

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
                picture:response.data.picture,
                catogeory: response.data.catogeory,
                price: response.data.price,
                qty: response.data.qty,
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

    handleChangeCatogory(event) {
        this.setState({catogeory: event.target.value});
    }

    handleChangeBrandName(event) {
        this.setState({brand: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }
    handleChangeQty(event) {
        this.setState({qty: event.target.value});
    }
    handleChangePrice(event) {
        this.setState({price: event.target.value});
    }



    async handleSubmit(event) {

        event.preventDefault();
        let formData = new FormData();
        formData.append('productname', this.state.productname);
        formData.append('id', this.state.id);
        formData.append('brand', this.state.brand);
        formData.append('catogeory',this.state.catogeory);
        formData.append('description',this.state.description);
        formData.append('file',this.state.image);
        formData.append('qty',this.state.qty);
        formData.append('price',this.state.price);

        if (this.state.price >0 && this.state.qty>0){
            axios.post(`http://localhost:8080/productController/product`,formData)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.props.history.push('/ViewAll/');

                })
            axios.put(`http://localhost:8080/productController/update`, formData)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.props.history.push('/ViewAll/');
                })
        }
        else {
            swal("Some thing went wrong!");
        }




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


    render() {
        return (
            <div>
                <MDBContainer >
                    <MDBRow className={"justify-content-center"}>
                        <MDBCol size={8}>
                            <MDBCard style={{marginTop: "1rem"}}>
                                <MDBCardHeader className="text-center" style={{backgroundColor: "gray", color: "white"}}>Add
                                    Products</MDBCardHeader>
                                <MDBCardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <MDBRow center={true}>
                                            <MDBCol size="4">

                                                {
                                                    this.state.imageURLValidation ?
                                                        <MDBCol style={{maxWidth: "14rem"}}>
                                                            <MDBCard>
                                                                <MDBCardImage className="img-fluid "
                                                                              src={this.state.imageUrl}
                                                                              waves/>
                                                            </MDBCard>
                                                        </MDBCol>

                                                        : ''
                                                }




                                            </MDBCol>


                                        </MDBRow>
                                        <br/>
                                        {/*//display photo*/}
                                        <MDBRow center>
                                            <MDBCol size="9">

                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                                              Upload
                                                    </span>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input
                                                            required={true}
                                                            type="file"
                                                            className="custom-file-input"
                                                            id="inputGroupFile01"
                                                            aria-describedby="inputGroupFileAddon01"
                                                            onChange={this.onchangeFile}
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                            {this.state.imageName}
                                                        </label>
                                                    </div>
                                                </div>
                                            </MDBCol>
                                            <MDBCol size={"1"}>
                                                {
                                                    this.state.imageURLValidation ?
                                                        <MDBBtn onClick={this.removePhoto}><MDBIcon icon="trash" style={{color: 'red'}}/></MDBBtn> : ''
                                                }
                                            </MDBCol>
                                        </MDBRow>


                                        {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                                        <MDBRow center={true}>

                                            <MDBCol md="10">

                                                {/*<p className="h4 text-center mb-4"></p>*/}
                                                <label htmlFor="productname" className="grey-text ">
                                                    Product name
                                                </label>
                                                <input type="text" id="productname" name="productname" className="form-control"   value={this.state.productname}
                                                       onChange={this.handleChangeProductName}/>
                                                <br/>
                                                <label htmlFor="productId" className="grey-text">
                                                    Product ID
                                                </label>
                                                <input type="text" id="productId" name="id" className="form-control"      value={this.state.id}
                                                       onChange={this.handleChangeID} required={true}/>
                                                <br/>
                                                <label htmlFor="productQTY" className="grey-text">
                                                    Product QTY
                                                </label>
                                                <input type="text" id="productQTY" name="qty" className="form-control"    value={this.state.qty}
                                                       onChange={this.handleChangeQty}/>
                                                <br/>
                                                <label htmlFor="productPrice" className="grey-text">
                                                    Price
                                                </label>
                                                <input type="" id="productPrice" name="price" className="form-control"   value={this.state.price}
                                                       onChange={this.handleChangePrice}/>
                                                <br/>


                                                <label htmlFor="brand" className="grey-text">
                                                    Brand
                                                </label>

                                                <select className="browser-default custom-select" id="brand" name="brand"
                                                        onChange={this.handleChangeBrandName}>
                                                    <option value={this.state.brand}>{this.state.brand}</option>
                                                    <option value="Adidas">Adidas</option>
                                                    <option value="Nike">Nike</option>
                                                    <option value="Puma">Puma</option>
                                                    <option value="other">Other</option>
                                                </select>

                                                {/*<input type="select" id="defaultFormContactSubjectEx" className="form-control" />*/}

                                                <br/>
                                                <label htmlFor="catogeory" className="grey-text">
                                                    Catogeory
                                                </label>
                                                <select className="browser-default custom-select" id="catogeory"
                                                        name="catogeory" onChange={this.handleChangeCatogory}>
                                                    <option value={this.state.catogeory}>{this.state.catogeory}</option>
                                                    <option value="Clothing">Clothing</option>
                                                    <option value="Protection">Protection</option>
                                                    <option value="Books">Books</option>
                                                </select>

                                                <br/>
                                                <label htmlFor="description" className="grey-text">
                                                    Description
                                                </label>
                                                <textarea type="text" id="description" name="description"
                                                          className="form-control" rows="3" value={this.state.description}
                                                          onChange={this.handleChangeDescription}/>

                                                <div className="text-center mt-4">
                                                    <MDBBtn color="warning" type="submit">Update</MDBBtn>
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


export default UploadItems;