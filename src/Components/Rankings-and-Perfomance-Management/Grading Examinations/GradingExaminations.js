import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button, Container, Alert, Col, Form } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faSave, faUndo, faPlusSquare, faFilePdf} from '@fortawesome/free-solid-svg-icons';
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

            fCode:null,
            fDescription:'',
            fDate : moment(new Date()).format('YYYY-MM-DD'),
            fMessage: null
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
                    this.setState({fMessage:null})
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
            disabled: true
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
                        this.setState({fCode: '', fDescription:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message:null, updateClicked:null, disabled: false})
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
                        this.setState({fCode: '', fDescription:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message:null, updateClicked:null, disabled: false})
                        this.refreshExams()
                    }
                )
        }
    }

    resetExamRecord(){
        this.setState({fCode:null, fDescription:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message: null, fMessage:null, updateClicked: null, disabled:false})
    }

    examChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    





    render() { 

        const {fCode, fDate, fDescription, fMessage} = this.state;

        return ( 

            <div>

                <Container>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faList} /> Grading Examinations</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Exam Code</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.exams.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="4" >No Grading Examination Records Available</td>
                                </tr> :

                                this.state.exams.map((exam) => (
                                    <tr key={exam.examCode}>
                                        <td>{exam.examCode}</td>
                                        <td>{exam.description}</td>
                                        <td>{moment(exam.date).format('YYYY-MM-DD')}</td>
                                        <td>
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