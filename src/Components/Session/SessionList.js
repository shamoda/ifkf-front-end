import React, { Component } from "react";
import "./Session.css";
import {Row,Container,Table,Button,ButtonGroup,Card,Form,InputGroup,Col,Alert, FormControl} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import SessionService from "../../API/SessionService";
import {faSave,faUndo,faList,faEdit,faTrash,faFilePdf,faSearch, faUnderline,faTimes,faStepBackward,faFastBackward,faStepForward,faFastForward} from "@fortawesome/free-solid-svg-icons";

import swal from "sweetalert";
class SessionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Sessions: [],
      currentPage:1,
      sessionsPerPage:5,
      search:'',
      searchMessage:null,
      fMessage: null,
      message: null,
      fErrorMessage: null
    };

    this.addSession = this.addSession.bind(this);
    this.updateSessionClicked = this.updateSessionClicked.bind(this);
    this.deleteSessionClicked = this.deleteSessionClicked.bind(this);
  }

  addSession() {
    this.props.history.push("/AddSession");
  }

  // calling the restAPI
  componentDidMount() {
    this.refreshSession();
  }

  //update session
  updateSessionClicked(id) {
    this.props.history.push(`/AddSession/${id}`);
  }
//refresh Session
  refreshSession() {
    SessionService.getSessions().then((response) => {
      this.setState({ Sessions: response.data });
    });
  }

  //generate report button clicked
  generateSessionReportClicked(searchText){
    SessionService.downloadSessionReport(searchText)
        .then(
            response => {
                this.setState({message : response.data, fMessage:''})
                this.refreshSession();
            }
        )
}
//Delete Session
  deleteSessionClicked(id) {
    SessionService.deleteSession(id).then((response) => {
     
      swal({
        title:"Session Deleted Successfully",
        icon:"warning",
        button:"ok"
      })

      this.refreshSession();
    });
  }
//.............................................................................

  searchChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  cancelSearch =() =>{
    this.setState({
     search:'',
     searchMessage:null,
     fMessage:null
  })
   this.refreshSession();
}
//Session search by instructor ID
searchData =() =>{

  if(this.state.search !==''){
    SessionService.searchSession(this.state.search)
    .then(
      response =>{
        if(response.data.length >= 1){
          this.setState({Sessions :response.data,
            searchMessage: null,
            fMessage:null
          })
        }
        else{
          this.setState({searchMessage:"Sorry !! No matching ID Found",  fMessage: null})
        }
      }
    )
  }
}

//...............................................................
 changePage = event => {
    this.setState({
      [event.target.name]: parseInt(event.target.value) //converting to int
    });
  };

  firstPage = ()=>{
    if(this.state.currentPage > 1){
      this.setState({
        currentPage: 1
      });
    }
  };

  prevPage = () =>{
    if(this.state.currentPage > 1){
      this.setState({
        currentPage:this.state.currentPage -1
      });
    }
  };

  lastPage = ()=>{
    if(this.state.currentPage < Math.ceil(this.state.Sessions.length /this.state.sessionsPerPage)){
      this.setState({
        currentPage:Math.ceil(this.state.Sessions.length /this.state.sessionsPerPage)
      });
    }
  };
  nextPage = ()=>{
    if(this.state.currentPage < Math.ceil(this.state.Sessions.length /this.state.sessionsPerPage)){
      this.setState({
        currentPage:this.state.currentPage + 1
      });
    }
  };


  render() {
    const {
      search,currentPage,sessionsPerPage,Sessions} = this.state;
      //pagination
    const lastIndex = currentPage * sessionsPerPage;
    const firstIndex = lastIndex - sessionsPerPage;
    const currentSessions =Sessions.slice(firstIndex,lastIndex);
    const totalPages = Sessions.length / sessionsPerPage;

    //css for pagetext
    const pageNumCss ={
      width: "45px",
      border:"1px solid #17A2B8",
      color:"#17A2B8",
      textAlign:"center",
      fontWeight:"bold"
    };

    return (
      <div style={{ padding: "0 50px" }}>
      <br/>
      <br/>
      <br/>
        {/* <h2 className="text-center" >Session Time-Table</h2> */}
        <Container fluid>
        {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
        {this.state.searchMessage && <Alert variant="danger">{this.state.searchMessage}</Alert>}
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <Row>
                <Col>
                <div style={{float:"left"}}>
                            <FontAwesomeIcon icon={faList} /> Session Time Table
                            </div>
                            <br></br>
                            <br></br>
                  <div className="button">
                    <Button size="sm" variant="outline-warning" onClick={this.addSession}>
                      <i class="fas fa-user-plus"></i>
                      Add New Session
                    </Button>
                  </div>
                </Col>
                <Col sm={5}>
                  <div style ={{"float":"right"}} >
                    <InputGroup size="sm">
                      <Form.Control className="bg-dark text-white" style={{"border":"1px solid #17A2BB"}} name="search" placeholder="Search by InstructorID" autoComplete="off" value={search} onChange={this.searchChange} />
                      <InputGroup.Append>
                       <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>
                       <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes}  /></Button>
                     </InputGroup.Append>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table
                bordered
                hover
                striped
                variant="dark"
                borderless
                hover
                variant="dark"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    {/* <th>Session ID</th> */}
                    <th>Date (MM-DD-YYYY)</th>
                    <th>Starting Time</th>
                    <th>Ending Time</th>
                    <th>Venue</th>
                    <th>Instructor ID</th>
                    <th>Instructor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Sessions.length === 0 ?
                  <tr align ="center">
                    <td colSpan ="8">No Sessions Available</td>
                  </tr>:
                
                currentSessions.map((Session) => (
                    <tr key={Session.sessionId}>
                      {/* <td>{Session.sessionId}</td> */}
                      <td>
                        {moment(Session.day, "YYYY-MM-DD").format("MM-DD-YYYY")}
                      </td>
                      <td>{moment(Session.stime, "HH:mm:ss").format("LT")}</td>
                      <td>{moment(Session.etime, "HH:mm:ss").format("LT")}</td>
                      <td>{Session.venue}</td>
                      <td>{Session.instructorId}</td>
                      <td>{Session.instructorName}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            style={{ marginRight: 8 }}
                            onClick={() =>
                              this.updateSessionClicked(Session.sessionId)}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ marginRight: 4 }}/>
                            Update</Button>{"  "}

                          <Button size="sm" 
                          variant="outline-danger"
                          style={{ marginRight: 8 }}
                          onClick={() =>
                            this.deleteSessionClicked(Session.sessionId)
                          }>
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ marginRight: 4 }}
                            />
                            Delete </Button>{" "}

                          <Button 
                          size="sm" 
                          variant="outline-light"  
                          style={{ marginRight: 8 }}
                          onClick={() => this.generateSessionReportClicked(Session.instructorId)}
                          ><FontAwesomeIcon icon={faFilePdf} style={{ marginRight: 4 }} />
                          Report</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                  
                
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              <div style={{"float":"left"}}>
                  Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{"float":"right"}}>
                    <InputGroup size="sm">
                    <InputGroup.Prepend>
                   
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true :false}
                    onClick={this.firstPage}>
                         <FontAwesomeIcon icon={faFastBackward}/> First
                    </Button>
                    
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true :false}
                     onClick={this.prevPage}>
                    <FontAwesomeIcon icon={faStepBackward}/>  Prev
                    </Button>
                    </InputGroup.Prepend>

                    <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                    onChange={this.changePage}/>
                   
                    <InputGroup.Append>
                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true :false}
                     onClick={this.nextPage}>
                    <FontAwesomeIcon icon={faStepForward}/>  Next
                    </Button>
                   
                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true :false}
                     onClick={this.lastPage}>
                    <FontAwesomeIcon icon={faFastForward}/>  Last
                    </Button>
                    
                    </InputGroup.Append>
                    </InputGroup>
              </div>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    );
  }
}

export default SessionList;
