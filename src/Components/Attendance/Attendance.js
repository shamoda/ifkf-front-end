import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl, Alert, ControlLabel, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faFastBackward, faStepBackward, faStepForward, faFastForward,faUndo, faSearch, faEdit, faTimes, faUsers, faChartLine,faSave} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import AttendanceService from '../../API/AttendanceService';
import StudentService from '../../API/StudentService';
class Attendance extends Component {
    constructor(props){
        super(props);
        this.state = {
            attendanceID: -1,
            currentPage : 1,
            entriesPerPage : 4,
            search:'',
            searchMessage:null,
            students:[],
            sessionID: this.props.match.params.id,
            stuId:'',
            noOfday:'',
            stuName:'',
          


       
        }
        this.onSubmitAttendance = this.onSubmitAttendance.bind(this);
        
    }

    componentDidMount() {
        this.refreshStudents(this.sessionID);
    }

    refreshStudents(){


       AttendanceService.getstudentlistbySession(this.props.match.params.id)
            .then(
                response => {
                    this.setState({students : response.data})
                }
            )
    }


    refreshAttendance(stuId){
        AttendanceService.getAttendance(stuId)

             .then(response => this.setState({
                    attendanceID : response.data.attendanceID,
                    noOfday:  response.data.noOfdays
                 
          }))  

        
        StudentService.retrieveStudent(stuId)
        .then(response => this.setState({
                  stuId:  response.data.studentId,
                  stuName:  response.data.name,
                  
             
     }
        ))}

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage : 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage : this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.students.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage : Math.ceil(this.state.students.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.students.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage : this.state.currentPage + 1
            });
        }
    };


    onSubmitAttendance(event){

        event.preventDefault();
       

         
            if(this.state.attendanceID === -1){

                let attend = {
                   
                    attendanceID : this.state.attendanceID,
                    noOfdays  : this.state.noOfday,
                    stuId  : this.state.stuId
                   
                         
                };   
               
                AttendanceService.createAttendance(attend)
                .then(
                    response => {
                         this.setState({message : "Attendance Record Added Successfully.",Errormessage:null})
                       
                    }
                 ) 
              
                }
                
            
            else{

                let attend = {

                    attendanceID : this.state.attendanceID,
                    noOfdays  : this.state.noOfday,
                    stuId  : this.state.stuId
                    
                    
                }   

                AttendanceService.UpdateAttendance(this.state.attendanceID,attend)
                .then(
                    response => {
                         this.setState({message : "Attendance Record Added Successfully.",Errormessage:null})
                       
                    }
                 ) 
            }

        }

        attendChange = event =>{
            this.setState({
                [event.target.name] : event.target.value
            });
        };
    
    render() {

        const{stuId,stuName,noOfday,attendanceID} = this.state;

        const {students, currentPage, entriesPerPage, search} = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = students.slice(firstIndex, lastIndex);
        const totalPages = students.length / entriesPerPage;

        const pageNumCss = {
            width : "45px",
            border : "1px solid #24a0ed",
            color: "#24a0ed",
            textAlign: "center",
            fontWeight: "bold"
        }

        const searchBox = {
            border : "1.5px solid #24a0ed"
        }

        return (

            <div class="container" style={{ marginTop: 150 }}>
                <div class="row">
                    <div class="col" >
                    <Container>
                    {this.state.searchMessage && <Alert variant="danger">{this.state.searchMessage}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"} style={{width:600, marginLeft:-120}}>
                        <Card.Header>
                            <div style={{float:"left"}}>
                            <FontAwesomeIcon icon={faUsers} /> Students
                            </div>
                            <div style={{float:"right"}}>
                                <InputGroup size="sm">
                                    <FormControl style={searchBox} autoComplete="off" placeholder="Search" name="search" value={search} className="bg-dark text-white" onChange={this.searchChange}  />&nbsp;
                                    <InputGroup.Append>
                                        <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                                        <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes}  /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                            
                        </Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark" style={{textAlign:"center"}} size="sm">
                            <thead>
                                <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.students.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="4" >No Student Records Available</td>
                                </tr> :

                                currentEntries.map((student) => (
                                    <tr key={student.studentId}>
                                        <td>{student.studentId}</td>
                                        <td>{student.name}</td>
                                        <td style={{textAlign:"center"}}>
                                     <ButtonGroup>
                                          
                                        <Button  style={{}} onClick={() =>this.refreshAttendance(student.studentId) }> Attendance</Button> 
                                                {/* <Button size="sm" variant="outline-light" onClick={() => this.generateExamReportClicked(exam.examCode)}><FontAwesomeIcon icon={faFilePdf} /></Button> &nbsp;&nbsp;
                                                <Button size="sm" variant="outline-primary" onClick={() => this.updateExamRecordClicked(exam.examCode)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;
                                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteExamRecord(exam.examCode)}><FontAwesomeIcon icon={faTrash} /></Button> */}
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{float:"left"}}>
                                Showing Page {currentPage} of {Math.ceil(totalPages)}
                            </div>
                            <div style={{float:"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-primary" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-primary" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className="bg-dark" name="currentPage" value={currentPage} disabled />
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-primary" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                            Next <FontAwesomeIcon icon={faStepForward} />
                                        </Button>
                                        <Button type="button" variant="outline-primary" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
                                            Last <FontAwesomeIcon icon={faFastForward} />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                            <br></br>
                            <br></br>
                            <div>
                           
                            </div>
                        </Card.Footer>
                    </Card>
                </Container>

                     

                        <br />
                        <br />
                        <br />
                        <br />


                    </div>
                    <div class="col"> 
                    <Container  style={{marginLeft:100}}>
                      {this.state.Errormessage && <Alert variant="danger">{this.state.Errormessage}</Alert>}
                  
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header  >Attendance Record</Card.Header>
                    <Form onSubmit={this.onSubmitAttendance} id="Id"  method ="post">
                    <Card.Body>
                    
                        <Form.Row>
                            

                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Student ID</Form.Label>
                       
                                <h4  style={{marginLeft:40}}>{stuId}</h4>
                        
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Student Name</Form.Label>
                       
                                 <h4  style={{marginLeft:30}}>{stuName}</h4>
                        
                            </Form.Group>

                        </Form.Row>


                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Attendance ID</Form.Label>
                       
                                 <h4 style={{marginLeft:40}}>{attendanceID}</h4>
                        
                         </Form.Group>

                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Current Attendance</Form.Label>
                       
                                 <h4 style={{marginLeft:40}}>{noOfday}</h4>
                        
                         </Form.Group>


                        <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>No of Attendance</Form.Label>
                            <Form.Control as="select" name="noOfday" value={noOfday}  onChange={this.attendChange} className={"bg-dark text-white"}>
                                <option value="">-- Select --</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              
                            </Form.Control>
                            </Form.Group>

                        </Form.Row>

                      
                        
                        
                    </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
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
              </div>

                </div>
            </div>






        );
    }
}

export default Attendance;