import React, {Component} from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl, Alert, ControlLabel, FormGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import EquipmentDataService from '../../API/EquipmentDataService';
import { faList, faEdit, faTrash, faSave, faUndo ,faSearch,faTimes,faFilePdf,faPlusSquare,faStepForward} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import "./box.css"
class EquipmentDashboard extends Component {
    constructor(props){
        super(props)
         this.state = { 

            id :-1,
            type :'',
            supplier : '',
            brand:'',
            quantity:0,

            equipments:[],
            search:'',
            message:'',

            errors:[],
            length:'',
            Errormessage:'',
            searchMessage: '',
            fMessage: '',
            Avquantity:0,
            Availablequantity:0


           
           
          
         
         } 
     

     this.refreshEquipments=this.refreshEquipments.bind(this);
     this.onSubmitRecords=this.onSubmitRecords.bind(this);
     this.deleteEquipmentClicked=this.deleteEquipmentClicked.bind(this);
     this.UpdateEquipmentClicked=this.UpdateEquipmentClicked.bind(this);
     this.resetERecord = this.resetERecord.bind(this);
     this.resetERecordDemo = this.resetERecordDemo.bind(this);
    //  this.Subquantity = this.Subquantity.bind(this);

    }


    componentDidMount(){

        this.refreshEquipments();
    

    }

 
    downloadReportClicked = () => {
     
        EquipmentDataService.downloadEquipmentreport()
            .then(
                response => {
                    this.setState({message : response.data,Errormessage:''})
                }
            )
    };

    UpdateEquipmentClicked(id){  

      

            EquipmentDataService.retrieveEquipment(id)

             .then(response => this.setState({
                     id:response.data.id,
                     type: response.data.type,
                     quantity: response.data.quantity,
                     brand : response.data.brand,
                     supplier : response.data.supplier
             }))  

          
             EquipmentDataService.getTotalquantity(id)
               .then(response => this.setState({
                        Avquantity : response.data.quantity,
            
 
            
     }))  

     let Availablequantity = this.state.quantity - this.state.Avquantity;
     this.setState({Availablequantity});
       
    }

    
       
      
        
        refreshEquipments(){
            


            EquipmentDataService.retrieveAllEquipment()
            .then(
    
                response => {
    
                    this.setState({equipments : response.data})
                }    
              
            )

         

         
        }

     

    onSubmitRecords(event){

        


        event.preventDefault();

        if(this.state.type === ''){
            this.setState({Errormessage:'Please Select a Equipment Type to Proceed.',message:null})
            return
        }

        if(this.state.quantity === '' || this.state.quantity ==='0'|| this.state.quantity >= 'a'  ){
            this.setState({Errormessage:"Please Select a Valid Input for the Quantity.",message:null})
            return
        }

      
        if(this.state.id === -1){
            {
            let equi = {
               
               
                type: this.state.type, 
                brand: this.state.brand, 
                quantity: this.state.quantity,
                supplier : this.state.supplier
            };


        
               
            

                EquipmentDataService.CreateEquipment(equi)
                .then(
                    response => {
                        this.refreshEquipments()
                        this.setState({message : "Equipment Added Successfully.",Errormessage:null})
                    }
                 ) 
              
                }

            }

            else{
            
                let equi = {
                    id : this.state.id,
                    type: this.state.type, 
                    brand: this.state.brand, 
                    quantity: this.state.quantity,
                    supplier : this.state.supplier
                };

                EquipmentDataService.UpdateEquipment(this.state.id,equi)
                .then(
                    response => {
                        this.refreshEquipments();
                        this.setState({message : "Equipment Updated Successfully.",Errormessage:null})
                    }
                 ) 
              
                }
                
           

            }
            
        
    
        EquiChange = event =>{
            this.setState({
                [event.target.name] : event.target.value
            });
        };


        deleteEquipmentClicked(id){


            EquipmentDataService.deleteEquipment(id)
             .then(
                 response =>{
                this.setState({message : `Delete of Equipment ${id} Successful`,Errormessage:null});
                this.refreshEquipments();
    
   
                 }
                
             )
             this.setState({Errormessage : `Delete of Equipment ${id} UnSuccessful`,message:null});
         }


         searchChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            });
        };
    
    
        searchData = () => {
    
            if (this.state.search !== '') {
                EquipmentDataService.searchEquipment(this.state.search)
                    .then(
                        response => {
                            if (response.data.length >= 1) {
                                this.setState({
                                    equipments: response.data,
                                    searchMessage: null,
                                    fMessage: null
                                })
                            }
                            else {
                                this.setState({
                                    searchMessage: "No Matching Record Found",
                                    fMessage: null
                                })
                            }
                        }
                    )
            }
        }
    
        cancelSearch = () => {
            this.setState({
                search: '',
                searchMessage: null,
                fMessage: null
            })
            this.refreshEquipments();
        }
      
        resetERecord(){
            this.setState({  id :-1,type :'', supplier : '', brand:'', quantity:'',Errormessage:'',message:''})
        }

        resetERecordDemo(){
            this.setState({ type :'Gloves', supplier : 'CA Sports', brand:'FILLA', quantity:'345',Errormessage:'',message:''})
        }
    render() { 
    

        const {type,supplier,quantity,brand,search,Avquantity,Availablequantity} = this.state

        
        const searchBox = {
            border: "1.5px solid #24a0ed",
            borderRadius: "4px",
            height: "35px",
            marginTop:"10PX"
        }


    return (  
        <div>
          <div style={{marginLeft: 100 ,fontFamily:"Brush Script MT",fontSize:64}}>
               <h1>Equipment Dashboard</h1>
       </div>
               <Button variant="secondary" style={{marginLeft: 500,marginTop:10,marginBottom:20,width:200}} ><a href="/donations" style={{color:"black",textDecoration: 'none'}}>Add Donations</a> </Button>
               <Button variant="primary" style={{marginLeft: 100,marginTop:10,marginBottom:20,width:200}} ><a href="/Showrequests" style={{color:"black",textDecoration: 'none'}}>Check Requests</a> </Button>{' '}



            
            
      <Container>
                  {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                  {this.state.Errormessage && <Alert variant="danger">{this.state.Errormessage}</Alert>}
                  <Card className={"border border-dark bg-dark text-white"}>
                  <Card.Header  style={{fontFamily:"Brush Script MT"}}>Add Equipment</Card.Header>
                  <Form onSubmit={this.onSubmitRecords} id="FormId"  method ="post">
                  <Card.Body>
                  
                  <Form.Row>
                        

                          <Form.Group as={Col} controlId="formGridAuthor" >
                              <Form.Label>Equipment Type</Form.Label>
                              <Form.Control type="text" name="type" value={type}  onChange={this.EquiChange} autoComplete="off" placeholder="Type" className={"bg-dark text-white"} />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridTitle" >
                          <Form.Label>Supplier</Form.Label>
                          <Form.Control type="text" name="supplier" value={supplier}  onChange={this.EquiChange} required autoComplete="off" placeholder="Supplier" className={"bg-dark text-white"} />
                       
                        
                          </Form.Group>

                      </Form.Row>

                      <Form.Row>
                          <Form.Group as={Col} controlId="formGridTitle" style={{marginLeft:80}}>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control type="text" name="quantity"  value={quantity}  onChange={this.EquiChange} style={{width:300}}  autoComplete="off" placeholder="Quantity" className={"bg-dark text-white"} style={{ width:200}}/>
                   
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridTitle" style={{marginLeft:200,width:50}}>
                          <Form.Label style={{marginLeft: -200}}>Brand</Form.Label>
                          <Form.Control type="text" name="brand" value={brand}  onChange={this.EquiChange} style={{marginLeft: -200}} required autoComplete="off" placeholder="Brand" className={"bg-dark text-white"} />
                          </Form.Group>
                 
                     
                        <Form.Group  style={{marginLeft:-50}}>
                           <Form.Label style={{marginRight:70}}>Donated Quantity:</Form.Label>
                           
                            <h5>{Avquantity}</h5>
                       </Form.Group>

                       <Form.Group  style={{marginLeft:-50}}>
                           <Form.Label style={{marginRight:70}}>Available Quantity:</Form.Label>
                           
                            <h5>{Availablequantity}</h5>
                       </Form.Group>
                      
                      
                      </Form.Row>

                    
                      
                      
                  </Card.Body>
                      <Card.Footer style={{"textAlign":"right"}}>
                     
                           <Button variant="success" size="sm" type="submit">
                                Save  <FontAwesomeIcon icon={faPlusSquare} /> 
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset" onClick={this.resetERecord}>
                            <FontAwesomeIcon icon={faUndo} /> Reset 
                            </Button>

                            <Button style={{marginLeft:5}} variant="info" size="sm" type="reset" onClick={this.resetERecordDemo}>
                            <FontAwesomeIcon icon={faStepForward} /> DEMO
                            </Button>
                           
                          <Button variant="outline-light" size="sm" type="button" block style={{fontWeight:600, fontSize:17,marginTop:10}} onClick={ this.downloadReportClicked.bind()} >
                            <FontAwesomeIcon icon={faFilePdf} /> Download Report</Button>
                      </Card.Footer>
                  </Form>
                  </Card>
              </Container>
      

    <br />

 

            <div className= "App">

           

           
            <div style={{ marginLeft:200, width: 300 }}>
                                <InputGroup size="sm">
                                    <FormControl style={searchBox} autoComplete="off" placeholder="Search" name="search" value={search} className="bg-dark text-white" onChange={this.searchChange} />&nbsp;
                                    <InputGroup.Append>
                                        <Button size="sm"  style={{height: 35 ,marginTop:10}}variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                                       <Button size="sm"   style={{height: 35,marginTop:10}} variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes} /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
             
            </div>

                <div className="grid" style={{marginLeft:100,marginRight:200}}>

                {
              this.state.equipments.map((equipment) => (
               
                    <div className="box" key={equipment.id} style={{boxShadow:"2px 3px 2px #9E9E9E",borderRadius:5}}>

                        <div className = "card-texts">
                        <h4  style={{fontFamily:"Comic Sans MS, Comic Sans, cursive"}}>{equipment.type}</h4>
                        <div style={{fontFamily:"Comic Sans MS, Comic Sans, cursive"}}>
                        Supplier :  {equipment.supplier} <br/>
                        Brand    :   {equipment.brand}  <br/>
                        Quantity  :   {equipment.quantity} <br/>
                        </div>
                        </div>
                        <div className= "card-btn" style={{marginTop:10}}>
                        <Button size="sm" variant="outline-primary" onClick={()=> this.UpdateEquipmentClicked(equipment.id)} ><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button size="sm" variant="outline-danger" onClick={() => this.deleteEquipmentClicked(equipment.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </div>
                    </div>
                ))
               

                  }

            </div>
                
           
            

    <br />
    <br />
    <br/>
    <br />
    <br />
    <br/>
  </div>

        );
    }
}
 
export default EquipmentDashboard;