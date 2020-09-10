import React, { Component } from 'react';
import { Card,Form,Col,Button, Container,ButtonGroup, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'
import { } from 'react-router-dom';
import StudentService from '../../API/StudentService';
import moment from 'moment'


class Enrollments extends Component {
    constructor(props){
        super (props)
        this.state={
            unregStudent: [],
            // dob: moment(new Date()).format('YYYY-MM-DD')
        }
        this.refreshEnrollment =this.refreshEnrollment.bind(this);
    }

    componentDidMount(){
        this.refreshEnrollment();

        }
    


    refreshEnrollment(){
        StudentService.retrieveAllEnrollments()
        .then(
            response => {
                this.setState({unregStudent : response.data})
            }
        )
    }

    deleteStudentsClick(id){
        StudentService.deleteEnrollment(id)
        .then(() => this.refreshEnrollment())
        // .then(
        //     response =>{
        //         this.setState({message: `Delete of Enrollment ${id} Successful`})
        //     }
        // )
    }

    updateStudentClicked(id){
        this.props.history.push(`/enrollmentform/${id}`)
    }

    render() { 
        return ( 
            <div>
                <Container className="mb-3" fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Body>
                            <Form.Row>
                            <Card.Header style={{fontSize:'20px'}}>Filter By:</Card.Header>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Kyu: </Form.Label>
                            <Form.Control as={"select"} required autoComplete="off" className={"bg-dark text-white"} >
                                <option value={"10,9,8,7"}>10 09 08 07</option>
                                <option value={"6,5,4"}>06 05 04</option>
                                <option value={"3,2,1"}>03 02 01</option>
                                <option value={"Black"}>Black</option>
                            </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Age: </Form.Label>
                            <Form.Control as={"select"} required autoComplete="off" className={"bg-dark text-white"} >
                                <option value={"Under 13"}>Under 13</option>
                                <option value={"Under 17"}>Under 17</option>
                                <option value={"Under 21"}>Under 21</option>
                                <option value={"21+ Open"}>21+ Open</option>
                            </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Weight: </Form.Label>
                            <Form.Control as={"select"} required autoComplete="off" className={"bg-dark text-white"} >
                                <option value={"41-45"}>41kg - 45kg</option>
                                <option value={"46-50"}>46kg - 50kg</option>
                                <option value={"51-55"}>51kg - 55kg</option>
                                <option value={"56-60"}>56kg - 60kg</option>
                                <option value={"61-65"}>61kg - 65kg</option>
                                <option value={"66-70"}>66kg - 70kg</option>
                                <option value={"70+"}>70kg+</option>
                            </Form.Control>
                            </Form.Group>
                            </Form.Row>
                        </Card.Body>
                    </Card>
                </Container>
                <Container fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header style={{fontSize:'30px'}}><FontAwesomeIcon icon={faList} /> Currant Enrollemnts For This Event</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>NIC</th>
                        <th>Date of Birth</th>
                        <th>Weight</th>
                        <th>kyu</th>
                        <th>Phone</th>
                        <th>E-mail</th>
                        <th>Guardian Name</th>
                        <th>Guardian Phone</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.unregStudent.map(
                                std=>
                                <tr key = {std.id}>
                                    <td>{std.id}</td>
                                    <td>{std.name}</td>
                                    <td>{std.address}</td>
                                    <td>{std.nic}</td>
                                    <td>{moment(std.dob).format('YYYY-MM-DD')}</td>
                                    <td>{std.weight}</td>
                                    <td>{std.kyu}</td>
                                    <td>{std.phone}</td>
                                    <td>{std.email}</td>
                                    <td>{std.guardianName}</td>
                                    <td>{std.guardianPhone}</td>
                                    <ButtonGroup>
                                        <Button size="sm" variant="outline-primary" onClick={() => this.updateStudentClicked(std.id)}><FontAwesomeIcon icon={faEdit} /></Button> {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                        <Button size="sm" variant="outline-danger" onClick={() => this.deleteStudentsClick(std.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                    </tr>
                            )
                        }
                    </tbody>
                    </Table>
                    </Card.Body>
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

export default Enrollments;