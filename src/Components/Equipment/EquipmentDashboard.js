import React, {Component} from 'react';
import {Card, Button, Container, Form,Col,InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {  faEdit,faSave,faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import EquipmentDataService from '../../API/EquipmentDataService'

import "./box.css"
class EquipmentDashboard extends Component {
    constructor(props){
        super(props)
         this.state = { 

            id :this.props.match.params.id,
            type :'',
            supplier : '',
            brand:'',
            quantity:'',

            equipments:[],
            search:''

         
      
     }

     this.refreshEquipments = this.refreshEquipments.bind(this);
     this.onSubmitRecords = this.onSubmitRecords.bind(this);
   
     this.deleteEquipmentClicked = this.deleteEquipmentClicked.bind(this);
     this.UpdateEquipmentClicked = this.UpdateEquipmentClicked.bind(this);


    

    }


    componentDidMount(){

        this.refreshEquipments();

    }


    UpdateEquipmentClicked(id){

            if(this.state.id=== -1){

                return
            }  


            EquipmentDataService.retrieveEquipment(id)

             .then(response => this.setState({
                     id: response.data.id,
                     type: response.data.type,
                     quantity: response.data.quantity,
                     brand : response.data.brand,
                     supplier : response.data.supplier
             }))  

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
       
            let equi = {
                id : this.state.id,
                type: this.state.type, 
                brand: this.state.brand, 
                quantity: this.state.quantity,
                supplier : this.state.supplier
            };


            if(this.state.id === -1){

                EquipmentDataService.CreateEquipment(equi)
                .then(
                    response => {
                        this.refreshEquipments()
                    }
                 ) 
              
                }

              

            else{
            
                EquipmentDataService.UpdateEquipment(this.state.id,equi)
                .then(
                    response => {
                        this.refreshEquipments()
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
     
                 this.setState({message : `Delete of Equipment ${id} Successful`});
                 this.refreshEquipments();
                 }
     
             )
         }
          

         updateSearch = e =>{

             this.setState({search: even.target.value.substr(0,20)});
         }


    render() { 
    
      
      

        const {id,type,supplier,quantity,brand} = this.state
       
    return (  

        <div>
               <h1>Equipment Dashboard</h1>
               
               <Container className="Equi-form">
            
            <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={faEdit} /> Add Equipment</Card.Header>
            <Form onSubmit={this.onSubmitRecords} id="FormId"  method = "post">
            <Card.Body>
            
                
                 
                  

                
                <Form.Row>

                <Form.Group as={Col} controlId="gdg">
                        <Form.Label>Equipment ID</Form.Label>
                        <Form.Control type="text" name="id" value={id}  onChange={this.EquiChange} placeholder="Title" className={"bg-dark text-white"} />
                    </Form.Group>

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

 

            <div className= "App">

            <Button variant="secondary" style={{marginLeft: 20}} ><a href="/donations">Donations</a> </Button>{' '}
           

            <Form.Row>
                    <Form.Group as={Col}>
                        <InputGroup style={{ width: 300 , marginLeft:20,marginTop:20}}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control onChane={this.updateSearch}
                                type="text"
                                placeholder="Search here.."

                                
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
              
             
            </div>

                <div className="grid">

                {

                this.state.equipments.map((equipment) => ({
               
                  return(  <div className="box" >

                  <ul>

                        <div className = "card-text">
                        <h4>{equipment.type}</h4>
                           {equipment.quantity}
                        </div>
                        <div className= "card-btn">
                        <Button size="sm" variant="outline-primary" onClick={()=> this.UpdateEquipmentClicked(equipment.id)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button size="sm" variant="outline-danger" onClick={() => this.deleteEquipmentClicked(equipment.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </div>
                    </div>
                )})
                </ul>

              

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