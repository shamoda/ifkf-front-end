import React, {Component} from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup ,InputGroup, FormControl,Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import EquipmentDataService from '../../API/EquipmentDataService'
import { faList, faEdit, faTrash,faPlusSquare, faUndo,faSearch,faTimes,faFilePdf} from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import moment from 'moment'
import {faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';

class Donations extends Component {
    constructor(props){
    super(props);
     this.state = {  

        
        id : -1,
        date:  moment(new Date()).format('YYYY-MM-DD'),
        quantity:'',
        sessionID:'',
        equipmentID: '',

        
        donations:[],
        currentPage : 1,
        donationsPerPage : 4,
        optionList:[],
        message: null,
        search:'',
        Errormessage:null,
        repmessage:null,
        Availablequantity:null,
        Avquantity:null,
        Totquantity:null

    }

    this.refreshDonations = this.refreshDonations.bind(this);
    this.deleteDonationClicked = this.deleteDonationClicked.bind(this);
    this.retrieveDonations = this.retrieveDonations.bind(this);
    this.onSubmitDonations = this.onSubmitDonations.bind(this);
    this.resetERecord = this.resetERecord.bind(this);
    this.resetERecordValue =this.resetERecordValue.bind(this);
  }

    
    componentDidMount(){

        this.refreshDonations();
    



        EquipmentDataService.retrieveAllEquipment()
        .then(
            response => {
                
                this.setState({optionList:response.data.map(equipment =>
                    <option value={this.equipmentID} id= {equipment.id}>
                        {equipment.id}
                    </option>
                )})
            }
        )
    

     
        
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
 
             this.setState({message : `Delete of Donation ${id} Successful`,Errormessage:null,repmessage:null});
             this.refreshDonations();
             }
 
         )
     }

     downloadReportClicked = () => {
     
        EquipmentDataService.downloadReport()
            .then(
                response => {
                    this.setState({repmessage : response.data, message:'',Errormessage:''})
                }
            )
    };

      retrieveDonations(id){

     

        EquipmentDataService.retrieveDonation(id)

         .then(response => this.setState({
                 id:  response.data.donateID,
                 date: moment(response.data.donateDate).format('YYYY-MM-DD'),
                 quantity: response.data.quantity,
                 equipmentID:response.data.equipment.id,
                 sessionID : response.data.sessions.sessionId
               
         }))  

    }

   
     onSubmitDonations(event){

        event.preventDefault();

     
        
  

            // EquipmentDataService.retrieveEquipment(this.state.equipmentID)
    
            // .then(response => this.setState({
                  
            //         Totquantity: response.data.quantity,
                   
            // }))  

            
    
           
        //     EquipmentDataService.getTotalquantity(this.state.equipmentID)
        //     .then(response => this.setState({
        //              Avquantity : response.data.quantity,
              
         
    
        //     }))
         
    
        //     this.setState({Availablequantity : this.state.Totquantity - this.state.Avquantity});
    
        
        //     console.log(this.state.Totquantity)
        //     console.log(this.state.Avquantity)
        //     console.log(this.state.Availablequantity)

        // if( this.state.quantity > this.state.Availablequantity ){
        //     this.setState({Errormessage:"Donated Quantity is exceeding the Available quantity in Stocks.",message:null})
        //     return
        // }

        if(this.state.equipmentID === ''){
            this.setState({Errormessage:'Please Select a Equipment Type to Proceed.',message:null,repmessage:null})
            return
        }

        
        if(this.state.sessionID === ''){
            this.setState({Errormessage:'Please Select a session to Proceed.',message:null,repmessage:null})
            return
        }
    
        if(this.state.quantity === '' || this.state.quantity ==='0'|| this.state.quantity >= 'a'  ){
            this.setState({Errormessage:"Please Select a Valid Input for the Quantity.",message:null})
            return
        }
         
            if(this.state.id === -1){

                let don = {
                   
                    quantity: this.state.quantity,
                    donateDate : this.state.date,
                    equipment :
                        {id : this.state.equipmentID},
                    sessions :
                        {sessionId : this.state.sessionID}
                         
                };   
               
                EquipmentDataService.CreateDonations(don)
                .then(
                    response => {
                         this.setState({message : "Donations Record Added Successfully.",Errormessage:null,repmessage:null})
                         this.refreshDonations()
                    }
                 ) 
              
                }
                
            
            else{

                let don = {
                    donateID : this.state.id,
                    quantity: this.state.quantity,
                    donateDate : this.state.date,
                    equipment :
                        {id : this.state.equipmentID},
                    
                    sessions :
                        {sessionId : this.state.sessionID}
                    
                    
                };   


            
                EquipmentDataService.UpdateDonations(this.state.id,don)
                .then(
                    response => {
                          this.setState({message : "Donations Record Updated Successfully.",Errormessage:null,repmessage:null})
                          this.refreshDonations()
                    }
                )
              }
            }
         
        
            searchData = () => {

                if (this.state.search !== '') {
                    EquipmentDataService.searchDonation(this.state.search)
                        .then(
                            response => {
                                if (response.data.length >= 1) {
                                    this.setState({
                                        donations: response.data,
                                        searchMessage: null,
                                        message: null
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
                this.refreshDonations();
            }
        

            searchChange = event => {
                this.setState({
                    [event.target.name]: event.target.value
                });
            };
    
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

   

    resetERecord(){
        this.setState({ id : -1, date:  moment(new Date()).format('YYYY-MM-DD'),  quantity:'',  sessionID:'', equipmentID: '', Errormessage:'',message:'',repmessage:'',Availablequantity:0,Avquantity:0}) }



    resetERecordValue(){
            this.setState({  date:  moment(new Date()).format('YYYY-MM-DD'),  quantity:'98',  sessionID:'1', equipmentID: 2, Errormessage:'',message:'',repmessage:''}) }
    
    
    render() { 

      
        
        const {date,quantity,sessionID, equipmentID,search} = this.state;
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

        const searchBox = {
            border: "1.5px solid #24a0ed"
        }

        


        return ( 

            <div>
            <div style={{marginLeft: 100 ,fontSize:20}}>
            Donations
          </div> 
        
       
                <Container>
         
                {this.state.Errormessage && <Alert variant="danger">{this.state.Errormessage}</Alert>}
                  
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header ><FontAwesomeIcon icon={faPlusSquare} />  Donate Now!!!</Card.Header>
                    <Form onSubmit={this.onSubmitDonations} id="Id"  method ="post">
                    <Card.Body>
                    
                        <Form.Row>
                            

                            <Form.Group as={Col} controlId="formGridAuthor">
                                <Form.Label> Donation Date</Form.Label>
                                <Form.Control type="date" name="date" value={date} onChange={this.EquiChange} placeholder="Donation Date"  required autoComplete="off"className={"bg-dark text-white"} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Equipment Type</Form.Label>
                            <Form.Control as="select" name="equipmentID" value={equipmentID} onChange={this.EquiChange}  autoComplete="off" placeholder="Equipment " className={"bg-dark text-white"} >
                             {this.state.optionList}
                          </Form.Control>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" name="quantity"  value={quantity} onChange={this.EquiChange}  placeholder="Quantity"  autoComplete="off"   className={"bg-dark text-white"} className={"bg-dark text-white"}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Session ID</Form.Label>
                            <Form.Control type="text" name="sessionID"  value={sessionID} onChange={this.EquiChange} required autoComplete="off" placeholder="Session ID" className={"bg-dark text-white"} style={{ width: 300}}/>
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

                            <Button style={{marginLeft:5}} variant="info" size="sm" type="reset" onClick={this.resetERecordValue}>
                            <FontAwesomeIcon icon={faStepForward} /> DEMO
                            </Button>
                           
                            {/* <Button variant="primary" size="sm" type="button" onClick={this.resultsList.bind()}>
                            <FontAwesomeIcon icon={faSave} /> Results
                            </Button> */}
                        </Card.Footer>
                    </Form>
                    </Card>
                </Container>



            

          

           
          <br/>
          <br/>


        <Container>
               
        {this.state.repmessage && <Alert variant="danger">{this.state.repmessage}</Alert>}
        {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
        <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faList} /> List
         <div style={{ float: "right" }}>
                <InputGroup size="sm">
                    <FormControl style={searchBox} autoComplete="off" placeholder="Search" name="search" value={search} className="bg-dark text-white" onChange={this.searchChange} />&nbsp;
                        <InputGroup.Append>
                            <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes} /></Button>
                        </InputGroup.Append>
                </InputGroup>
         </div>
         </Card.Header>
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
                <tr key={donations.donateID} align="center">
                <td>{donations.donateID}</td>
                <td>{moment(donations.donateDate).format('YYYY-MM-DD')}</td>
                <td>{donations.quantity}</td>
                <td>{donations.equipment.type}</td>
                <td>{donations.sessions.sessionId}</td>
              
                <td>

               <ButtonGroup>
             
                <Button size="sm" variant="outline-primary"  onClick={() => this.retrieveDonations(donations.donateID)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="sm" variant="outline-danger" onClick={() => this.deleteDonationClicked(donations.donateID)}><FontAwesomeIcon icon={faTrash} /></Button>
               </ButtonGroup>
        </td>
    </tr>
))

}
       

         
          </tbody>
         </Table>
         </Card.Body>
         <Card.Footer style={{"textAlign":"right"}}>
         <Button variant="outline-light" size="sm" type="button" block style={{fontWeight:600, fontSize:17,marginBottom:10}} onClick={ this.downloadReportClicked.bind()} >
            <FontAwesomeIcon icon={faFilePdf} /> Download Report
        </Button>

         <div style={{"float":"left"}}>
             Showing Page {currentPage} of {Math.ceil(totalPages)}

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
