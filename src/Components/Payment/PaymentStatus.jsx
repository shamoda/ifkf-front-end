import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

class PaymentStatus extends Component {
    constructor(props){
        super(props)
        this.state = {
           paymentstatus: [
            {id: 1, sessionid: 1, name: 'Nimal Kumara', status: 'Paid'},
            {id: 2, sessionid: 2, name: 'Kamal', status: 'Unpaid' }
           ]
        }
        this.addPayment = this.addPayment.bind(this)
    }

    addPayment(){
        this.props.history.push('/addPayment')
    }
    render() {
        return (
            <div>
                <h1>Student List :</h1>
                <Container>
                <Card className ={"border border-dark bg-dark text-white"} >
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Session ID</th>
                                    <th>Name</th>
                                    <th>Payment Status</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.paymentstatus.map(
                                paymentstatus => 
                                <tr>
                                <td>{paymentstatus.id}</td>
                                <td>{paymentstatus.sessionid}</td>
                                <td>{paymentstatus.name}</td>
                                <td>{paymentstatus.status}</td>
                                <td>
                                   
                                  <Button size="sm" variant="outline-info" onClick={() => this.addPayment()}><FontAwesomeIcon icon={faEdit} /></Button>
                                 
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

export default PaymentStatus;