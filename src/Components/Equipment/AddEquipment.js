import React, { Component } from 'react';
import EquipmentDataService from '../../API/EquipmentDataService'
import { Card, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faList} from '@fortawesome/free-solid-svg-icons'

class AddEquipment extends Component {
    constructor(props){
        super(props)
        this.state = {
           equipments :  [],
           message : null
           

           }
           this.refreshEquipment = this.refreshEquipment.bind(this);
           this.deleteEquipmentClicked = this.deleteEquipmentClicked.bind(this);
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


        deleteEquipmentClicked(id){


           EquipmentDataService.deleteEquipment(id)
            .then(
                response =>{
    
                this.setState({message : `Delete of Equipment ${id} Successful`});
                this.refreshEquipment();
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
                    <Table bordered hover striped variant="dark"  >
                    <thead style={{ height: 5 }}>
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
                                <tr key ={equipment.id} style={{ height: 2 ,padding:0,margin:0 }}>
                                <td >{equipment.type}</td>
                                <td>{equipment.supplier}</td>
                                <td>{equipment.quantity}</td>
                                <td>{equipment.brand}</td>


                           
                                <td><button className ="btn btn-success" style={{padding: 3}}>Update</button></td>
                               
                                    
                                <td><button className ="btn btn-warning" style={{padding: 3}} onClick={() => this.deleteEquipmentClicked(equipment.id)}>Delete</button></td>

                                

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