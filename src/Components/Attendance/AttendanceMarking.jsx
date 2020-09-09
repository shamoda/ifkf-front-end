import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import AttendanceService from '../../API/AttendanceService';

class AttendanceMarking extends Component {
    constructor(props){
        super(props)
        this.state = {
           attendancemarking: []
           
        }
        this.addStudent = this.addStudent.bind(this)
        this.retrieveAttendance = this.retrieveAttendance.bind(this)
    }

    addStudent(){
        this.props.history.push('/addStudent')
    }



    retrieveAttendance(){


        AttendanceService.retrieveAllAttendance()
        .then(

            response => {

                this.setState({attendancemarking : response.data})
            }
        )
    }



    
    render() {
        return (
            <div>
                <h1>Student Monthly Attendance.</h1>
                <Container>
                <Card className ={"border border-dark bg-dark text-white"} >
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Attendance <br/>
                                        Week 1
                                    </th>
                                    <th>Week 2</th>
                                    <th>Week 3</th>
                                    <th>Week 4</th>
                                    <th>Delete student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.attendancemarking.map((
                                attendance) => (
                                <tr key={attendance.attendanceID}>
                                     <td>{attendance.attendanceID}</td>
                                     <td>{attendance.studentName}</td>
                                {/* <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox className="bg-dark text-white" aria-label="Week1" />
                                  </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox aria-label="Week2" />
                                </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox aria-label="Week3" />
                                  </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox aria-label="Week4" />
                                  </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                    <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>
                                </td> */}
                                </tr>
                                ))
                             }
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Save
                            </Button> {' '}
                            <Button variant="info" size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                    </Card.Footer>
                </Card>
                
                </Container>
            </div>
        );
    }
}

export default AttendanceMarking;