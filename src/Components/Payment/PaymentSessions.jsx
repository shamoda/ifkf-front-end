import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import { withRouter} from 'react-router-dom';

class PaymentSessions extends Component{
    constructor(props){
    super(props)
    this.state = {
        paymentsessions : [
            {id: 1, instructor: 'Nimal Kumara', time: '08:30', students: 20}
        ]
    }
        this.studentList = this.studentList.bind(this)
    }

    studentList(){
        this.props.history.push('/studentList')
    }
    render() {
        return (
            <div>
                <Container>
                <Card className ={"border border-dark bg-dark text-white"} style={{marginTop:20}}>
                    <Card.Header>Payments.</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Session ID</th>
                                    <th>Instructor Name</th>
                                    <th>Session Time</th>
                                    <th>No Of students</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.paymentsessions.map(
                                paymentsessions => 
                                <tr>
                                <td>{paymentsessions.id}</td>
                                <td>{paymentsessions.instructor}</td>
                                <td>{paymentsessions.time}</td>
                                <td>{paymentsessions.students}</td>
                                <td>
                                    <Button size="sm" variant="success" type="submit" onClick={this.studentList}>
                                    View
                                    </Button>
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
        )
    }
}

export default withRouter(PaymentSessions);