import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl, Search } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo, faList, faEdit, faTrash, faUsers, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';
import StudentService from '../../API/StudentService';
import { withRouter} from 'react-router-dom';


class PaymentStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentList: [],
            search: ''
        }
        this.addPayment = this.addPayment.bind(this)
        this.refreshStudentsList = this.refreshStudentsList.bind(this)
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



    render() {
        const {search} = this.state;
        return (

            <div>
<br/>
<br/>
<br/>

                <div>
                    <Container>
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
                                                    <td>
                                                        <Button size="sm" variant="outline-info" onClick={() => this.addPayment(student.studentId)}>Payments  <FontAwesomeIcon icon={faEdit} /></Button>
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