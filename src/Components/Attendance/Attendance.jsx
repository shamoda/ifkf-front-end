import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import StudentService from '../../API/AttendanceService';

class Attendance extends Component {
    constructor(props){
        super(props)
        this.state = {
           attendance: [
            {id: 1, instructor: 'Nimal Kumara', time: '08:30', students: 20},
            {id: 2, instructor: 'Kamal', time: '10:30', students: 35}
           ]
        }
        this.attendanceList = this.attendanceList.bind(this)
    }

        componentDidMount() {
        this.attendanceList()
    }

    // attendanceList() {
    //     AttendanceService.getAttendance()
    //         .then(response => {
    //             this.setState({
    //                 attendance: response.data
    //             })
    //         })
    // }

    // attendanceList(){
    //     this.props.history.push('/attendanceList')
    // }
    render() {
        return (
            <div>
                <h1>Attendance.</h1>
                <Container>
                <Card className ={"border border-dark bg-dark text-white"} >
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Session ID</th>
                                    <th>Instructor Name</th>
                                    <th>Session Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.attendance.map(
                                (attendance) => 
                                <tr key={attendance.attendanceID}>
                                <td>{attendance.id}</td>
                                <td>{attendance.instructor}</td>
                                <td>{attendance.time}</td>
                                <td>{attendance.students}</td>
                                <td>
                                    <Button size="sm" variant="outline-info" onClick={() => this.attendanceList()}><FontAwesomeIcon icon={faList} /></Button>
                                </td>
                                <td>
                                    <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>
                                </td>
                                </tr>
                                )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                </Container>
            </div>
        );
    }
}

export default Attendance;