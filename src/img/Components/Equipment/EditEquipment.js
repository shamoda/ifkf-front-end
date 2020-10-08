import React, { Component } from 'react';
import EquipmentDataService from '../../API/EquipmentDataService'
import {Card, Button, Container, Form,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {  faEdit,faSave} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router-dom";




class EditEquipment extends Component {
    constructor(props){
        super(props)
         this.state = { 

            id :this.props.match.params.id,
            type :'',
            supplier : '',
            brand:'',
            quantity:''

         
      
     }

     this.refreshEquipment = this.refreshEquipment.bind(this);
     this.onSubmitRecords = this.onSubmitRecords.bind(this);


    

    }

    componentDidMount(){

        this.refreshEquipment();

    }


    refreshEquipment(){

            if(this.state.id=== -1){

                return
            }  


            EquipmentDataService.retrieveEquipment(this.state.id)

             .then(response => this.setState({
                     id: this.state.id,
                     type: response.data.type,
                     quantity: response.data.quantity,
                     brand : response.data.brand,
                     supplier : response.data.supplier
             }))  

        }


    onSubmitRecords(event){

        event.preventDefault();
       
            let equi = {
                id : this.state.id,
                type: this.state.type, 
                brand: this.state.brand, 
                quantity: this.state.quantity,
                supplier : this.state.supplier
            };


            if(this.state.id === -1){

                EquipmentDataService.CreateEquipment(equi)
                .then(()=> this.props.history.push('/equipment'))

              
             
                
            }
            else{
            
                EquipmentDataService.UpdateEquipment(this.state.id,equi)
                .then(() => this.props.history.push('/equipment'))
                
           

            }
            
        }
    
        EquiChange = event =>{
            this.setState({
                [event.target.name] : event.target.value
            });
        };


    render() { 

        const {id,type,supplier,quantity,brand} = this.state

        return ( 


        <div>


        <Container>
            
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faEdit} /> Add Equipment</Card.Header>
                <Form onSubmit={this.onSubmitRecords} id="FormId"  method = "post">
                <Card.Body>
                
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Equipment ID</Form.Label>
                            <Form.Control type="text" name="id" value={id}  onChange={this.EquiChange} placeholder="Equipment ID" className={"bg-dark text-white"} />
                        </Form.Group>
    
    
                    </Form.Row>

                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="gdg">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" name="type" value={type}  onChange={this.EquiChange} placeholder="Title" className={"bg-dark text-white"} />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="formGridIsbn">
                        <Form.Label>Supplier</Form.Label>
                        <Form.Control type="text" name="supplier" value={supplier}  onChange={this.EquiChange} placeholder="Title" className={"bg-dark text-white"} />
                        </Form.Group>
    
                    </Form.Row>
    
                    <Form.Row>
                        <Form.Group as={Col} controlId="fdgdg">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" name="quantity" value={quantity}  onChange={this.EquiChange}  placeholder="Title" className={"bg-dark text-white"} />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="fdgdg">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={brand}  onChange={this.EquiChange} required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                        </Form.Group>
    
                    </Form.Row>
    
                    
    
                        
    
               
                    
                </Card.Body>
    
                <Card.Footer style={{"textAlign":"right"}}>
                        <Button variant="success" size="sm" type="submit"  >
                        <FontAwesomeIcon icon={faSave} /> Save
                        </Button> {' '}
                      
                </Card.Footer>
                </Form>
                </Card>
          </Container>    
    

          

        <br />
        <br />
        <br/>
        <br />




        </div>



         );
    }
}

 
export default withRouter (EditEquipment);