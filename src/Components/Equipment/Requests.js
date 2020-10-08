import React, { Component } from 'react';
import EquipmentDataService from '../../API/EquipmentDataService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faSave, faUndo,faTimes,faSearch } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl, Alert, ControlLabel, FormGroup } from 'react-bootstrap';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import RequestsDataService from '../../API/RequestsDataService';
import AuthenticationService from '../Authentication/AuthenticationService';

class Requests extends Component {

    constructor(props) {
        super(props);

        this.state = {

            id: -1,
            type:'',
            quantity:'',
            requestDate:moment(new Date()).format('YYYY-MM-DD'),
            status:"Pending",
            sessionID:'',
            description:'',
            userID: AuthenticationService.loggedUserId(),
            requests: [],
            message:'',
            Errormessage:'',
            currentPage: 1,
            RequestsPerPage: 4

        }

        this.refreshRequests = this.refreshRequests.bind(this);
        this.onSubmitRequests = this.onSubmitRequests.bind(this);
    }


    
    componentDidMount(){

        this.refreshRequests();
    }

    refreshRequests() {

       RequestsDataService.getInRequest(this.state.userID)
            .then(

                response => {

                    this.setState({ requests: response.data })
                }

            )


    }


    onSubmitRequests(event){

        event.preventDefault();

    
    
        if(this.state.quantity === '' || this.state.quantity ==='0'|| this.state.quantity >= 'a'  ){
            this.setState({Errormessage:"Please Select a Valid Input for the Quantity.",message:null})
            return
        }

        
        if(this.state.type === ''  ){
            this.setState({Errormessage:"Please Select a Valid Input for the Type.",message:null})
            return
        }

        if( this.state.description === '' ){
            this.setState({Errormessage:"Please type a description",message:null})
            return
        }
    


        if(this.state.id === -1)
        {
        let req = {
          
            quantity: this.state.quantity,
            type : this.state.type,
            status : this.state.status,
            requestDate: this.state.requestDate,
            description: this.state.description,
            session :
                { id : this.state.sessionID},
            instructor :
                {id : this.state.userID}
     
            };   
         
           
               
              RequestsDataService.createRequest(req)


              
                .then(
                    response => {
                        this.setState({message : "Request sent Successfully",Errormessage:null})
                         this.refreshRequests()
                    }
                 ) 
              
               
              }
            
            }



              changePage = event => {

                this.setState({
                    [event.target.name]: parseInt(event.target.value)
                })
            }
        
            firstPage = () => {
                if (this.state.currentPage > 1) {
                    this.setState({
                        currentPage: 1
                    });
                }
            };
        
            prevPage = () => {
                if (this.state.currentPage > 1) {
                    this.setState({
                        currentPage: this.state.currentPage - 1
                    });
                }
            };
        
            lastPage = () => {

                let requestsLength = this.state.requests.length;
                if (this.state.currentPage < Math.ceil(requestsLength/ this.state.RequestsPerPage)) {
                    this.setState({
                        currentPage: Math.ceil(requestsLength / this.state.RequestsPerPage)
                    });
                }
            };
        
            nextPage = () => {
                if (this.state.currentPage < Math.ceil(this.state.requests.length / this.state.RequestsPerPage)) {
                    this.setState({
                        currentPage: this.state.currentPage + 1
                    });
                }
            };
        
            searchChange = event => {
                this.setState({
                    [event.target.name]: event.target.value
                });
            };
        

    EquiChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };


    searchData = () => {

        if (this.state.search !== '') {
            RequestsDataService.searchRequest(this.state.search)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({
                                requests: response.data,
                                searchMessage: null,
                                fMessage: null
                            })
                        }
                        else {
                            this.setState({
                                message: "No Matching Record Found",
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
        this.refreshRequests();
    }



    render() {

        const pageNumCss = {

            width: "45px",
            border: "1px solid #17A288",
            color: "#17A288",
            textAlign: "center",
            fontWeight: "bold"
  
          

        };

        
        const searchBox = {
            border: "1.5px solid #24a0ed"
        }


        const { requests, currentPage, RequestsPerPage, search } = this.state;
        const lastIndex = currentPage * RequestsPerPage;
        const firstIndex = lastIndex -  RequestsPerPage;
        const currentRequests = requests.slice(firstIndex, lastIndex);
        const totalPages = requests.length / RequestsPerPage;
       
        const {type,quantity,sessionID, requestDate,description, userID,status} = this.state;
      

        return (

            <div>
                 <div style={{marginLeft: 100 ,fontFamily:"Brush Script MT",fontSize:40}}>
                Requests
               
           </div> 


                <Container style={{ marginTop:50}}>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"} style={{width:1200}}>
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
                            <Table bordered hover striped variant="dark" style={{ textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                       
                                        <th>Equipment Type</th>
                                        <th>Quantity</th>
                                        <th>Request Date</th>
                                        <th>Description</th>
                                        <th>Status</th>

                                    

                                    </tr>
                                </thead>
                                <tbody>

                                    {requests.length === 0 ?

                                        <tr align="center">
                                            <td colSpan="7">No users Available</td>

                                        </tr> :
                                        currentRequests.map((request) => (
                                            <tr key={request.id} align="center">
                                                <td>{request.id}</td>
                                              
                                                <td>{request.type}</td>
                                                <td>{request.quantity}</td>
                                                <td>{moment(request.requestDate).format('YYYY-MM-DD')}</td>
                                            
                                             
                                                <td>{request.description}</td>
                                                <td>{request.status}</td>

                                               
                                            </tr>
                                        ))

                                    }




                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>


<div style={{ "float": "left" }}>
    Showing Page {currentPage} of {Math.ceil(totalPages)}

</div>
<div style={{ "float": "right" }}>
    <InputGroup>
        <InputGroup.Prepend>
            <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                onClick={this.firstPage} >
                <FontAwesomeIcon icon={faFastBackward} /> First
            </Button >

            <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                onClick={this.prevPage} >
                <FontAwesomeIcon icon={faStepBackward} /> Prev
            </Button>

        </InputGroup.Prepend>
        <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage} disabled
            onChange={this.changePage}
        />
        <InputGroup.Append>
            <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                onClick={this.nextPage}>
                <FontAwesomeIcon icon={faStepForward} />   Next
             </Button>

            <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                onClick={this.lastPage}>
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
                <br />
                <br />

               
              

                <Container >
                {this.state.Errormessage && <Alert variant="danger">{this.state.Errormessage}</Alert>}

                    <Card className={"border border-dark bg-dark text-white"} style={{ marginTop:50,width:1200 }}>
                  
                        <Card.Header style={{ fontFamily: "Brush Script MT" }}>Requests</Card.Header>
                        <Form id="Id" method="post" onSubmit={this.onSubmitRequests}>
                            <Card.Body>

                                <Form.Row>
                                   

                                    <Form.Group as={Col} controlId="formGridAuthor">
                                        <Form.Label> Request Date</Form.Label>
                                        <Form.Control type="date" name="requestDate" value={requestDate} onChange={this.EquiChange} placeholder="Donation Date" required autoComplete="off" className={"bg-dark text-white"} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label style={{  }}>Equipment Type</Form.Label>
                                        <Form.Control name="type" as="select" value={type} required autoComplete="off" onChange={this.EquiChange} placeholder="Equipment " className={"bg-dark text-white"} style={{ }} >
                                            <option>Gloves</option>
                                            <option>HeadGears</option>
                                            <option>Rebreakable Boards</option>
                                            <option>Hand Guards</option>
                                        </Form.Control>

                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="text" name="quantity" value={quantity} placeholder="Quantity" onChange={this.EquiChange} autoComplete="off"  className={"bg-dark text-white"} className={"bg-dark text-white"} style={{ width: 300 }} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label style={{ marginLeft: 50 }}>Instructor ID</Form.Label>
                                        <Form.Control type="text" name="userID"  value={userID} required autoComplete="off"  onChange={this.EquiChange} placeholder="Instructor ID" className={"bg-dark text-white"} style={{ width: 300 }} disabled />
                                    </Form.Group>

                                    
                                    
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label style={{ marginLeft: 50 }}>Session ID</Form.Label>
                                        <Form.Control type="text" name="sessionID" values={sessionID} required autoComplete="off"  onChange={this.EquiChange} placeholder="Session ID" className={"bg-dark text-white"} style={{ width: 300 }} />
                                    </Form.Group>

                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label>Description</Form.Label> <br />
                                        <textarea className={"bg-dark text-white"} name="description" value={description} id="exampleFormControlTextarea1" onChange={this.EquiChange} rows="5" style={{ width: 800, marginLeft: 2, boxSizing: 40, height: 50, borderRadius: 4 }}></textarea>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label style={{marginLeft:250}}>Status</Form.Label> <br />
                                        <Form.Control type="text" name="status" values={status} required autoComplete="off"  onChange={this.EquiChange} placeholder="Session ID" className={"bg-dark text-white"} style={{ width: 300,marginLeft:250 }} defaultValue="Pending" disabled/>
                                    </Form.Group>
                                </Form.Row>




                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                                <Button variant="success" size="sm" type="submit">
                                    <FontAwesomeIcon icon={faSave} />
                                </Button>{' '}
                                <Button variant="info" size="sm" type="reset">
                                    <FontAwesomeIcon icon={faUndo} /> Reset
                          </Button>
                                {/* <Button variant="primary" size="sm" type="button" onClick={this.resultsList.bind()}>
                          <FontAwesomeIcon icon={faSave} /> Results
                          </Button> */}
                            </Card.Footer>
                        </Form>
                    </Card>
                </Container>



                <br />
                <br />


                <br />
                <br />
                <br />
                <br />






            </div>


        );
    }
}

export default Requests;