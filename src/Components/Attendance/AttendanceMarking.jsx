import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import AttendanceService from '../../API/AttendanceService';

class AttendanceMarking extends Component {
    constructor(props){
        super(props)
        this.state = {
           attendancemarking: [
               {StudentID: 1, StudentName: 'Kamal', week1: '1', week2: '1',week3: '1'}
           ]
           
        }
        //this.retrieveAttendance = this.retrieveAttendance.bind(this)
       // this.deleteAttendance = this.deleteAttendance.bind(this)
       // this.addAttendance = this.addAttendance.bind(this)
    }


   // retrieveAttendance(){


    //    AttendanceService.retrieveAllAttendance()
    //    .then(

     //       response => {

    //            this.setState({attendancemarking : response.data})
    //        }
    //    )
    //}

   // componentDidMount(){
    //    this.refreshAttendance()
   // }

   // refreshAttendance(){
    //    AttendanceService.getAttendance()
    //        .then(response => {
    //          this.setState({
    //              attendancemarking : response.data
    //           })
    //        })
   // }


    deleteAttendance(attendanceID){
        AttendanceService.deleteAttendance(attendanceID)
            .then(response => {
                this.refreshAttendance()
            })
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
                                     <td>{attendance.StudentID}</td>
                                     <td>{attendance.StudentName}</td>
                                 <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox className="bg-dark text-white" aria-label="week1" />
                                  </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox aria-label="week2" />
                                </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox aria-label="week3" />
                                  </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                <InputGroup className="">
                                  <InputGroup.Prepend>
                                  <InputGroup.Checkbox aria-label="week4" />
                                  </InputGroup.Prepend>
                                </InputGroup>
                                </td>
                                <td>
                                    <Button size="sm" variant="outline-danger" onClick={() => this.deleteAttendance(attendance.attendanceID)} ><FontAwesomeIcon icon={faTrash} /></Button>
                                </td> 
                                </tr>
                                ))
                             }
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit" onClick={() => this.addAttendance()}>
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