import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';

class PaymentStatus extends Component {
    constructor(props){
        super(props)
        this.state = {
           paymentstatus: []
        }
        this.addPayment = this.addPayment.bind(this)
        this.refreshPayments = this.refreshPayments.bind(this)
        this.deletePayment = this.deletePayment.bind(this)
    }

    componentDidMount(){
        this.refreshPayments()
    }

    refreshPayments(){
        PaymentService.getPayments()
            .then(response => {
                this.setState({
                    paymentstatus : response.data
                })
            })
    }

    deletePayment(paymentID){
        PaymentService.deletePayment(paymentID)
            .then(response => {
                this.refreshPayments()
            })
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
                                this.state.paymentstatus.map((payment) => (
                                <tr key={payment.paymentID}>
                                <td>{payment.studentID}</td>
                                <td>{payment.sessionId}</td>
                                <td>{payment.studentName}</td>
                                <td>{payment.paymentStatus}</td>
                                <td>
                                   
                                  <Button size="sm" variant="outline-info" onClick={() => this.addPayment()}><FontAwesomeIcon icon={faEdit} /></Button>
                                 
                                </td>
                                <td>
                                    <Button size="sm" variant="outline-danger" onClick={() => this.deletePayment(payment.paymentID)} ><FontAwesomeIcon icon={faTrash} /></Button>
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
        );
    }
}

export default PaymentStatus;