import React, { Component } from 'react';
import EquipmentDataService from '../../API/EquipmentDataService'
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

class AddEquipment extends Component {
    constructor(props){
        super(props)
        this.state = {
           equipments :  []
           

           }
           this.refreshEquipment = this.refreshEquipment.bind(this);
        }

        componentDidMount(){


            this.refreshEquipment();
      
      
          }
      

        refreshEquipment(){


            EquipmentDataService.retrieveAllEquipment()
            .then(
    
                response => {
    
                   // console.log(response);
                   this.setState({equipments : response.data})
    
    
                }
    
    
            )
        }
        render() {
            return (
                <div>

                <Container>

                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>Type</th>
                        <th>Supplier</th>
                        <th>Quantity</th>
                        <th>Brand</th>
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.equipments.map(
                                equipment =>
                                <tr key ={equipment.id}>
                                <td>{equipment.type}</td>
                                <td>{equipment.supplier}</td>
                                <td>{equipment.quantity}</td>
                                <td>{equipment.brand}</td>


                                <td>
                                    <ButtonGroup>
                                
                                        <Button size="sm" variant="primary" ><FontAwesomeIcon icon={faEdit} /></Button>
                                    </ButtonGroup>
                                </td>
                                <td>
                                    

                                      <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>

                                </td>

                                </tr>


                            )



                        }
                            
                     
                          
                    </tbody>
                    </Table>
                </Card.Body>
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
    export default  AddEquipment;