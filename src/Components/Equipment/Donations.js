import React, {Component} from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup ,InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import EquipmentDataService from '../../API/EquipmentDataService'
import {faSave, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import moment from 'moment'
import {faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';

class Donations extends Component {
    constructor(props){
    super(props);
     this.state = {  

        
        id : '',
        date:  moment(new Date()).format('YYYY-MM-DD'),
        quantity:'',
        sessionID:'',
        equipmentID: '',

        
        donations:[],
        currentPage : 1,
        donationsPerPage : 4
    }

    this.refreshDonations = this.refreshDonations.bind(this);
    this.deleteDonationClicked = this.deleteDonationClicked.bind(this);
    this.retrieveDonations = this.retrieveDonations.bind(this);
    this.onSubmitDonations = this.onSubmitDonations.bind(this);
  }

    
    componentDidMount(){

        this.refreshDonations();
        
      }

   refreshDonations(){

        EquipmentDataService.retrieveAllDonations()
        .then(

            response => {

                this.setState({donations : response.data})
            }    
          
        )

     
    }

    deleteDonationClicked(id){


        EquipmentDataService.deleteDonation(id)
         .then(
             response =>{
 
             this.setState({message : `Delete of Donation ${id} Successful`});
             this.refreshDonations();
             }
 
         )
     }

      retrieveDonations(id){

     

        EquipmentDataService.retrieveDonation(id)

         .then(response => this.setState({
                 id:  response.data.donate_ID,
                 date: moment(response.data.Donate_date).format('YYYY-MM-DD'),
                 quantity: response.data.quantity,
                 sessionID :response.data.equipment.id,
                 equipmentID: response.data.sessions.id
               
         }))  

    }

   
     onSubmitDonations(event){

        event.preventDefault();
       
            let don = {
                donate_ID : this.state.id,
                quantity: this.state.quantity,
                donate_Date : this.state.date,
                equipment :
                    {id : this.state.equipmentID},
                
                sessions :
                    {id : this.state.sessionID}
                
                
            };   
            if(this.state.id === -1){

                EquipmentDataService.CreateEquipment(don)
                .then(
                    response => {
                         this.refreshDonations()
                    }
                 ) 
              
                }
                
            
            else{


            
                EquipmentDataService.UpdateDonations(this.state.id,don)
                .then(
                    response => {
                          this.refreshDonations()
                    }
                )
              }
            }
         
        



    
    EquiChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };


    changePage = event => {

        this.setState({
            [event.target.name] : parseInt(event.target.value)
        })
    }

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        let donationsLength = this.state.donations.length;
        if(this.state.currentPage < Math.ceil(donationsLength / this.state.donationsPerPage)) {
            this.setState({
                currentPage: Math.ceil(donationsLength / this.state.donationsPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.donations.length / this.state.donationsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    render() { 

      
        
        const {id,date,quantity,sessionID, equipmentID} = this.state;
        const{donations, currentPage, donationsPerPage} = this.state;
        const lastIndex = currentPage * donationsPerPage;
        const firstIndex = lastIndex - donationsPerPage;
        const currentDonations = donations.slice(firstIndex, lastIndex);
        const totalPages = donations.length / donationsPerPage;

        const pageNumCss = {

            width: "45px",
            border : "1px solid #17A288",
            color : "#17A288",
            textAlign: "center",
            fontWeight: "bold"


        };

        


        return ( 

            <div>
            <h3>Donations</h3>
            

            <Container>
            
            <Card className={"border border-dark bg-dark text-white"} style={{width:1000 ,height: 400}}>
            <Card.Header><FontAwesomeIcon icon={faEdit} /> Add Donations</Card.Header>
            <Form onSubmit={this.onSubmitDonations} id="Id"  method ="post">
            <Card.Body>
            
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Donation ID</Form.Label>
                        <Form.Control type="text" name="id" value={id} onChange={this.EquiChange} placeholder="Equipment ID" className={"bg-dark text-white"} style={{width:300}}/>
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="gdg">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="type"   onChange={this.EquiChange} placeholder="Title" className={"bg-dark text-white"} style={{ width: 300}}/>
                    </Form.Group> */}
                </Form.Row>

                
                <Form.Row>
                 

                   
                    <Form.Group as={Col} controlId="fdgdg">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity"  value={quantity} onChange={this.EquiChange}  placeholder="Quantity" className={"bg-dark text-white"} style={{ width: 300}}/>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridIsbn">
                    <Form.Label>Donation Date</Form.Label>
                    <Form.Control type="date" name="date" value={date} onChange={this.EquiChange} placeholder="Donation Date" className={"bg-dark text-white"} style={{ width: 300}}/>
                    </Form.Group>
                  
                    </Form.Row>

                    <Form.Row>
                 

                   
                 <Form.Group as={Col} controlId="fSS">
                     <Form.Label>Session ID</Form.Label>
                     <Form.Control type="text" name="sessionID"  value={sessionID} onChange={this.EquiChange}  placeholder="Session ID" className={"bg-dark text-white"} style={{ width: 300}}/>
                 </Form.Group>


                 <Form.Group as={Col} controlId="formGrFFn">
                 <Form.Label>Equipment ID</Form.Label>
                 <Form.Control type="text" name="equipmentID" value={equipmentID} onChange={this.EquiChange} placeholder="Equipment ID" className={"bg-dark text-white"} style={{ width: 300}}/>
                 </Form.Group>
               
                 </Form.Row>
            
              
            </Card.Body>

            <Card.Footer style={{"textAlign":"right"}}>


                    <div style={{"float":"left"}}>
                        Showing Page {currentPage} of {totalPages}

                    </div>

                
                    <Button variant="success" size="sm" type="submit" >
                    <FontAwesomeIcon icon={faSave} /> Save
                    </Button> {' '}
                  
            </Card.Footer>
            </Form>
            </Card>
      </Container>    



           
          <br/>
          <br/>




        <Container>

        <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faList} /> List</Card.Header>
        <Card.Body>
         <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
          <thead>
          <tr>
          <th>Donation ID</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Equipment</th>
          <th>Session ID</th>
          <th>Action</th>
         
         </tr>
          </thead>
             <tbody>
             { donations.length === 0 ?

                <tr align="center">
                    <td colSpan="6">No users Available</td>

                </tr> :
              currentDonations.map((donations) => (
                <tr key={donations.donate_ID} align="center">
                <td>{donations.donate_ID}</td>
                <td>{moment(donations.donate_Date).format('YYYY-MM-DD')}</td>
                <td>{donations.quantity}</td>
                <td>{donations.equipment.type}</td>
                <td>{donations.sessions.id}</td>
              
                <td>

               <ButtonGroup>
             
                <Button size="sm" variant="outline-primary"  onClick={() => this.retrieveDonations(donations.donate_ID)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="sm" variant="outline-danger" onClick={() => this.deleteDonationClicked(donations.donate_ID)}><FontAwesomeIcon icon={faTrash} /></Button>
               </ButtonGroup>
        </td>
    </tr>
))

}
       

         
          </tbody>
         </Table>
         </Card.Body>
         <Card.Footer style={{"textAlign":"right"}}>


         <div style={{"float":"left"}}>
             Showing Page {currentPage} of {totalPages}

        </div>
        <div style={{"float":"right"}}>
            <InputGroup>
                <InputGroup.Prepend>
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                    onClick = {this.firstPage} >
                    <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button >

                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                     onClick = {this.prevPage} >
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>

                </InputGroup.Prepend>
                <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                onChange={this.changePage}
                />
                <InputGroup.Append>
                  <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                   onClick = {this.nextPage}>
                  <FontAwesomeIcon icon={faStepForward} />   Next
                  </Button>

                  <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                   onClick = {this.lastPage}>
                  <FontAwesomeIcon icon={faFastForward} />  Last
                 </Button>
                
                </InputGroup.Append>
            
            </InputGroup>

        </div>


      

     </Card.Footer>
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
 
export default  withRouter (Donations) ;
