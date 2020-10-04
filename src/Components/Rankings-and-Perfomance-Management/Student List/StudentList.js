import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button, Container, InputGroup, FormControl, Alert } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faFastBackward, faStepBackward, faStepForward, faFastForward, faSearch, faEdit, faTimes, faUsers, faChartLine} from '@fortawesome/free-solid-svg-icons';
import StudentListDataService from './StudentListDataService';
import {Link} from 'react-router-dom';


class StudentList extends Component {

    constructor(props){
        super(props);
        this.state = {
            students:[],

            currentPage : 1,
            entriesPerPage : 8,
            search:'',
            searchMessage:null
        }

    }

    refreshStudents(){
        StudentListDataService.retrieveAllStudents()
            .then(
                response => {
                    this.setState({students : response.data})
                }
            )
    }

    componentDidMount() {
        this.refreshStudents();
    }

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

    cancelSearch = () => {
        this.setState({
            search:'',
            searchMessage: null,
            fMessage:null
        })
        this.refreshStudents();
    }

    searchData = () => {

        if(this.state.search !== ''){
            StudentListDataService.searchStudent(this.state.search)
                .then(
                    response => {
                        if(response.data.length >= 1){
                            this.setState({students : response.data,
                                            searchMessage: null,
                                            fMessage:null
                            })
                        }
                        else{
                            this.setState({searchMessage: "No Matching Record Found",
                                            fMessage: null
                        })
                        }
                    }
                )
        }
    }

    gradingExaminationsClicked = () => {
        return this.props.history.push('/exams');
    };

    

    searchChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };



    



    render() { 

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

            <div>
                <br></br>
                <br></br>
    
                <Container>
                    {this.state.searchMessage && <Alert variant="danger">{this.state.searchMessage}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
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
                                                <Link to={"performance/"+student.studentId} className="btn btn-sm btn-outline-info" style={{fontWeight:600}}><FontAwesomeIcon icon={faList} /> Performance</Link> &nbsp;&nbsp;
                                                <Link to={"ranking/"+student.studentId} className="btn btn-sm btn-outline-warning" style={{fontWeight:600}}><FontAwesomeIcon icon={faChartLine} /> Rank</Link> &nbsp;&nbsp;
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
                            <Button variant="primary" size="sm" type="button" block style={{fontWeight:600, fontSize:17}} onClick={this.gradingExaminationsClicked.bind()}>
                            <FontAwesomeIcon icon={faEdit} /> Grading Examinations
                            </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Container>
                <br></br>
                <br></br>
            </div>

         );
    }
}
 
export default StudentList;


// serach, add some styles