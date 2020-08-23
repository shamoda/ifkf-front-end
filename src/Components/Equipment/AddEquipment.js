import React, {Component} from 'react';
import EquipmentDataService from '../../API/EquipmentDataService'
import {Card, Button, Container, Table, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faSave} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';


class AddEquipment extends Component {
    constructor(props){
        super(props);

        this.state = {
     
           equipments:[]
    

           }
     
           this.deleteEquipmentClicked = this.deleteEquipmentClicked.bind(this);
           this.UpdateEquipmentClicked = this.UpdateEquipmentClicked.bind(this);
           this.addEqClicked = this.addEqClicked.bind(this);
           this.refreshEquipments = this.refreshEquipments.bind(this)
        
        }

        componentDidMount(){

            this.refreshEquipments();
            
          }

        refreshEquipments(){

            EquipmentDataService.retrieveAllEquipment()
            .then(
    
                response => {
    
                    this.setState({equipments : response.data})
                }    
              
            )

         
        }

      
        addEqClicked(){ 

                this.props.history.push(`/equipment/-1`)

        }
        
        
        UpdateEquipmentClicked(id){


            this.props.history.push(`/equipment/${id}`)

        
          
        }

      


        deleteEquipmentClicked(id){


           EquipmentDataService.deleteEquipment(id)
            .then(
                response =>{
    
                this.setState({message : `Delete of Equipment ${id} Successful`});
                this.refreshEquipments();
                }
    
            )
        }
            
           
    
        

        render() {

           
            return (
                <div>

    <Container>

    <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faList} /> Equipments   
    <Button size="sm" variant="outline-primary" onClick={() => this.addEqClicked()}><FontAwesomeIcon icon={faSave} /></Button>
                </Card.Header>
        <Card.Body>
            <Table bordered hover striped variant="dark">
            <thead>
                <tr align="center">
        
                <th>Type</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Brand</th>
                <th>Actions</th>
                
                </tr>
            </thead>
            <tbody>

            {

                this.state.equipments.map((equipment) => (
                    <tr key={equipment.id} align="center">
                        <td>{equipment.type}</td>
                        <td>{equipment.supplier}</td>
                        <td>{equipment.quantity}</td>
                        <td>{equipment.brand}</td>
                        <td>
                            <ButtonGroup>
                             
                                <Button size="sm" variant="outline-primary" onClick={()=> this.UpdateEquipmentClicked(equipment.id)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteEquipmentClicked(equipment.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))

                }
            </tbody>
            </Table>
        </Card.Body>
    </Card>





</Container>   
        <br/>
        <br />
    
       
            </div>



            );

  
        }
    }
    export default withRouter (AddEquipment);