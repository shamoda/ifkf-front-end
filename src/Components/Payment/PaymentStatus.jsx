import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl, Search, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo, faList, faEdit, faTrash, faUsers, faSearch, faTimes, faFilePdf, fMessage } from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';
import StudentService from '../../API/StudentService';
import { withRouter} from 'react-router-dom';


class PaymentStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentList: [],
            search: '',
            fMessage: null,
            message: null
        }
        this.addPayment = this.addPayment.bind(this)
        this.refreshStudentsList = this.refreshStudentsList.bind(this)
        this.generatePaymentReportClicked = this.generatePaymentReportClicked.bind(this)
    }

    componentDidMount() {
        this.refreshStudentsList()
    }

    refreshStudentsList() {
        StudentService.getStudents()
            .then(response => {
                this.setState({
                    studentList: response.data
                })
            })
    }

    addPayment(id) {
        this.props.history.push('/addPayment/' + id)
    }
    

    searchChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };


    search = () => {
        if(this.state.search !== ''){
            StudentService.serachStudents(this.state.search)
            .then(response => {
                this.setState({
                    studentList:response.data
                })
            })
        }
    } 


    
    cancelSearch =() => {
        this.setState({"search" : ''});
        this.refreshStudentsList()
    };


    generatePaymentReportClicked(studentId){
        PaymentService.downloadPaymentReport(studentId)
            .then(
                response => {
                    this.setState({message : response.data, fMessage:''})
                    this.refreshStudentsList();
                }
            )
    }



    render() {
        const {search} = this.state;
        return (

            <div>
<br/>
<br/>
<br/>

                <div>
                    <Container>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                        <Card className={"border border-dark bg-dark text-white"} >
                            <Card.Header>
                            <div style={{float:"left"}}>
                            <FontAwesomeIcon icon={faUsers} /> Students List
                            </div>
                             <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name ="search" value={search} 
                            className = {"border border-white bg-dark text-white"}
                            onChange={this.searchChange}/>

                            <InputGroup.Append>
                                <Button size="sm" variant = "outline-info" type = "button" onClick={this.search}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>&ensp;
                                <Button size="sm" variant = "outline-danger" type = "button" onClick={this.cancelSearch}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </InputGroup.Append>
                            
                        </InputGroup>
                    </div>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Student ID</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.studentList.map((student) => (
                                                <tr key={student.studentId}>
                                                    <td>{student.studentId}</td>
                                                    <td>{student.name}</td>
                                                    <td style={{textAlign:"center"}}>
                                                        <ButtonGroup>
                                                        <Button size="sm" variant="outline-info" onClick={() => this.addPayment(student.studentId)}>Payments  <FontAwesomeIcon icon={faEdit} /></Button>&nbsp;&nbsp;
                                                        <Button size="sm" variant="outline-light" onClick={() => this.generatePaymentReportClicked(student.studentId)} >Report  <FontAwesomeIcon icon={faFilePdf} /></Button> 
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

                
                </div>

<br/>
<br/>
<br/>

            </div>

        );
    }
}

export default withRouter(PaymentStatus);