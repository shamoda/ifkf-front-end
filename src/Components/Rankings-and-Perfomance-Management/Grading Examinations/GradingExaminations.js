import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button, Container, Alert, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faSave, faUndo, faPlusSquare, faFilePdf, faFastBackward, faStepBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'

import GradingExaminationsDataService from './GradingExaminationsDataService';

class GradingExaminations extends Component {

    constructor(props){
        super(props);
        this.state = {
            exams:[],
            message: null,
            updateClicked: null,
            disabled: false,

            fCode:'',
            fDescription:'',
            fDate : moment(new Date()).format('YYYY-MM-DD'),
            fMessage: null,

            currentPage : 1,
            entriesPerPage : 5,
            search:'',
            searchMessage:null
        }

        this.deleteExamRecord = this.deleteExamRecord.bind(this);
        this.updateExamRecordClicked = this.updateExamRecordClicked.bind(this);
        this.refreshExams = this.refreshExams.bind(this);
        this.submitExamRecord = this.submitExamRecord.bind(this);
        this.resetExamRecord = this.resetExamRecord.bind(this);
    }

    refreshExams(){
        GradingExaminationsDataService.retrieveAllExams()
            .then(
                response => {
                    this.setState({exams : response.data})
                }
            )
    }

    componentDidMount() {
        this.refreshExams();
    }


    deleteExamRecord(examCode){

        GradingExaminationsDataService.deleteExamRecord(examCode)
            .then(
                response => {
                    this.setState({message : "Exam Record Deleted Successfully."})
                    this.refreshExams()
                    this.setState({fMessage:null, searchMessage: null})
                }
            )
    }

    updateExamRecordClicked(examCode){

        GradingExaminationsDataService.getExam(examCode)
        .then(response => this.setState({
            fCode : response.data.examCode,
            fDescription : response.data.description,
            fDate : moment(response.data.date).format('YYYY-MM-DD'),
            updateClicked : 200,
            disabled: true,
            searchMessage: null
        }))
    }

    submitExamRecord(event){
        event.preventDefault();

        if (this.state.updateClicked === null) {

            let exam = {
                examCode: this.state.fCode, 
                description: this.state.fDescription,
                date: this.state.fDate 
            };

            GradingExaminationsDataService.submitExamRecord(exam)
                .then(
                    response => {
                        this.setState({fMessage : "Exam Record Added Successfully."})
                        this.setState({fCode: '', fDescription:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message:null, updateClicked:null, disabled: false, searchMessage: null})
                        this.refreshExams()
                    }
                )
        }else{

            let exam = {
                examCode: this.state.fCode, 
                description: this.state.fDescription,
                date: this.state.fDate 
            };

            GradingExaminationsDataService.updateExamRecord(exam)
                .then(
                    response => {
                        this.setState({fMessage : "Exam Record Updated Successfully."})
                        this.setState({fCode: '', fDescription:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message:null, updateClicked:null, disabled: false, searchMessage: null})
                        this.refreshExams()
                    }
                )
        }
    }

    resetExamRecord(){
        this.setState({fCode:'', fDescription:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message: null, fMessage:null, updateClicked: null, disabled:false})
    }

    examChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };


    // =================================================================================================================

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
        if(this.state.currentPage < Math.ceil(this.state.exams.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage : Math.ceil(this.state.exams.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.exams.length / this.state.entriesPerPage)) {
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
        this.refreshExams();
    }

    searchData = () => {

        if(this.state.search !== ''){
            GradingExaminationsDataService.searchExams(this.state.search)
                .then(
                    response => {
                        if(response.data.length >= 1){
                            this.setState({exams : response.data,
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
    






    render() { 

        const {fCode, fDate, fDescription, currentPage, entriesPerPage, exams, search} = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = exams.slice(firstIndex, lastIndex);
        const totalPages = exams.length / entriesPerPage;

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

                <Container>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    {this.state.searchMessage && <Alert variant="danger">{this.state.searchMessage}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <div style={{float:"left"}}>
                            <FontAwesomeIcon icon={faList} /> Grading Examinations
                            </div>
                            <div style={{float:"right"}}>
                                <InputGroup size="sm">
                                    <FormControl style={searchBox} autoComplete="off" placeholder="Search" name="search" value={search} className="bg-dark text-white" onChange={this.examChange}  />&nbsp;
                                    <InputGroup.Append>
                                        <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                                        <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes}  /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                            
                        </Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Exam Code</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th style={{textAlign:"center"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.exams.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="4" >No Grading Examination Records Available</td>
                                </tr> :

                                currentEntries.map((exam) => (
                                    <tr key={exam.examCode}>
                                        <td>{exam.examCode}</td>
                                        <td>{exam.description}</td>
                                        <td>{moment(exam.date).format('YYYY-MM-DD')}</td>
                                        <td style={{textAlign:"center"}}>
                                            <ButtonGroup>
                                                {/* <Link to={"edit/"+rank.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link> &nbsp;&nbsp; */}
                                                <Button size="sm" variant="outline-light" onClick={() => this.updateExamRecordClicked(exam.examCode)}><FontAwesomeIcon icon={faFilePdf} /></Button> &nbsp;&nbsp;
                                                <Button size="sm" variant="outline-primary" onClick={() => this.updateExamRecordClicked(exam.examCode)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;
                                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteExamRecord(exam.examCode)}><FontAwesomeIcon icon={faTrash} /></Button>
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
                        </Card.Footer>
                    </Card>
                </Container>
                <br/>



{/* ==================================================================================================================================================================== */}


                <Container>
                    {this.state.fMessage && <Alert variant="success">{this.state.fMessage}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.updateClicked !== null ? faEdit : faPlusSquare} /> {this.state.updateClicked !== null ? "Update Examination Record" : "Add New Examination Record"}</Card.Header>
                    <Form onReset={this.resetExamRecord} onSubmit={this.submitExamRecord} id="bookFormId" method="post">
                    <Card.Body>
                    
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Exam Code</Form.Label>
                                <Form.Control type="text" name="fCode" value={fCode} onChange={this.examChange} required autoComplete="off" placeholder="Enter Exam Code" className={"bg-dark text-white"} disabled={this.state.disabled} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Exam Description</Form.Label>
                                <Form.Control type="text" name="fDescription" value={fDescription} onChange={this.examChange} required autoComplete="off" placeholder="Enter Exam Description" className={"bg-dark text-white"} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="fDate" value={fDate} onChange={this.examChange} required className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        
                    </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {this.state.updateClicked !== null ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                    </Card>
                </Container>
            </div>
         );
    }
}
 
export default GradingExaminations;