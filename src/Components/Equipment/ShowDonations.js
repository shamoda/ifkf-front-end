import React, {Component} from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup ,InputGroup, FormControl,Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import EquipmentDataService from '../../API/EquipmentDataService'
import {faSave, faList, faEdit, faTrash,faPlusSquare, faUndo,faSearch,faTimes,faFilePdf} from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import moment from 'moment'
import {faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import SessionService from "../../API/SessionService";
import StudentService from '../../API/StudentService';
class ShowDonations extends Component {
    constructor(props){
    super(props);
     this.state = {  

        
        quantity:'',
        sessionID:1,
        equipmentID: '',
    
        donations:[],
      
       
        optionList:[],
        message: null,
        search:''

    }

          this.refreshQ = this.refreshQ.bind(this);
  
   
  
    }
    
    componentDidMount(){



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

   refreshQ(sessionID){

        EquipmentDataService.retrieveSumquantityById(parseInt(sessionID))
        .then(

            response => {

                this.setState({donations : response.data})
            }    
          
        )

     
    }

   

     downloadReportClicked = () => {
     
        EquipmentDataService. downloadDonationsFullreport(this.state.sessionID)
            .then(
                response => {
                    this.setState({message : response.data,Errormessage:''})
                }
            )
    };

     
   
     
        
            searchData = () => {

                if (this.state.search !== '') {
                    EquipmentDataService.searchquantity(this.state.search)
                        .then(
                            response => {
                                if (response.data.length >= 1) {
                                    this.setState({
                                        
                                        donations: response.data,
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
                    sessionID: '',
                    searchMessage: null,
                    fMessage: null,
                   
                })
                this.refreshQ();
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

    SessionChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            donations:[]
        });
    
       this.refreshQ(this.state.sessionID)
       console.log(this.state.sessionID)
    };


    // changePage = event => {

    //     this.setState({
    //         [event.target.name] : parseInt(event.target.value)
    //     })
    // }

    // firstPage = () => {
    //     if(this.state.currentPage > 1) {
    //         this.setState({
    //             currentPage: 1
    //         });
    //     }
    // };

    // prevPage = () => {
    //     if(this.state.currentPage > 1) {
    //         this.setState({
    //             currentPage: this.state.currentPage - 1
    //         });
    //     }
    // };

    // lastPage = () => {
    //     let donationsLength = this.state.donations.length;
    //     if(this.state.currentPage < Math.ceil(donationsLength / this.state.donationsPerPage)) {
    //         this.setState({
    //             currentPage: Math.ceil(donationsLength / this.state.donationsPerPage)
    //         });
    //     }
    // };

    // nextPage = () => {
    //     if(this.state.currentPage < Math.ceil(this.state.donations.length / this.state.donationsPerPage)) {
    //         this.setState({
    //             currentPage: this.state.currentPage + 1
    //         });
    //     }
    // };

   

    


    render() { 

      
        
        const {id,date,quantity,sessionID, equipmentID,search,fsession} = this.state;
        const{donations} = this.state;
        // const lastIndex = currentPage * donationsPerPage;
        // const firstIndex = lastIndex - donationsPerPage;
        // const currentDonations = donations.slice(firstIndex, lastIndex);
        // const totalPages = donations.length / donationsPerPage;

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
            <div style={{marginLeft: 100 ,fontFamily:"Brush Script MT",fontSize:64}}>
            Donations
          </div> 

          <Button variant="secondary" style={{ marginLeft: 500, marginTop: 10, marginBottom: 20, width: 500, color: "black" }} ><a href="/requests" style={{ color: "black", textDecoration: 'none' }}>Request</a> </Button>{' '}
 
          <br/>
          <br/>


        <Container>
        {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
        <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faList} /> List
        <div style={{ float: "right" }}>
                {/* <InputGroup size="sm" style={{width:250,marginLeft:300}}>
                    <FormControl style={searchBox} autoComplete="off" placeholder="Search" name="search" value={search} className="bg-dark text-white" onChange={this.searchChange} />&nbsp;
                        <InputGroup.Append>
                            <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes} /></Button>
                        </InputGroup.Append>
                </InputGroup> */}

            
                   <InputGroup size="sm" style={{width:250,marginLeft:-200,marginTop:0}}>
                    <FormControl  className="bg-dark text-white" type="number" name="sessionID" value={sessionID} onChange={this.searchChange} placeholder="Search by your session ID" autoComplete="off">
                    
                        
                    </FormControl>&nbsp;

                    <InputGroup.Append>
                            <Button size="sm" variant="outline-primary" type="button" onClick={this.refreshQ(sessionID)}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes} /></Button>
                        </InputGroup.Append>
                    
       
                </InputGroup>
         </div>
         </Card.Header>
        <Card.Body>
         <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
          <thead>
          <tr>
          <th>Session ID</th>
          <th>Type</th>
          <th>Total Quantity</th>
         
         
         </tr>
          </thead>
             <tbody>
             { donations.length === 0 ?

                <tr align="center">
                    <td colSpan="6">No users Available</td>

                </tr> :
              donations.map((donations) => (
                <tr key={donations.donateID} align="center">
                <td>{donations.sessionId}</td>
                <td>{donations.type}</td>
                <td>{donations.quantity}</td>
            
              
                

    </tr>
))

              }
       

         
          </tbody>
         </Table>
         </Card.Body>
         <Card.Footer style={{"textAlign":"right"}}>
         <Button variant="outline-light" size="sm" type="button" block style={{fontWeight:600, fontSize:17,marginBottom:10}} onClick={ this.downloadReportClicked.bind(sessionID)} >
            <FontAwesomeIcon icon={faFilePdf} /> Download Report
        </Button>

         {/* <div style={{"float":"left"}}>
             Showing Page {currentPage} of {Math.ceil(totalPages)}

        </div> */}
        {/* <div style={{"float":"right"}}>
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

        </div> */}


      

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
 
export default  ShowDonations ;
