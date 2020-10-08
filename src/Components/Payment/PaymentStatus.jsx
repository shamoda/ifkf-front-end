import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo, faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';

class PaymentStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentstatus: []
        }
        this.addPayment = this.addPayment.bind(this)
        this.refreshPayments = this.refreshPayments.bind(this)
        this.deletePayment = this.deletePayment.bind(this)
    }

    componentDidMount() {
        this.refreshPayments()
    }

    refreshPayments() {
        PaymentService.getPayments()
            .then(response => {
                this.setState({
                    paymentstatus: response.data
                })
            })
    }

    deletePayment(paymentID) {
        PaymentService.deletePayment(paymentID)
            .then(response => {
                this.refreshPayments()
            })
    }

    addPayment(id) {
        this.props.history.push('/addPayment/' + id)
    }
    render() {
        return (

            <div>
                <div>
                    <h1>Student List :</h1>
                    <Container>
                        <Card className={"border border-dark bg-dark text-white"} >
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

                                                        <Button size="sm" variant="outline-info" onClick={() => this.addPayment(payment.studentID)}><FontAwesomeIcon icon={faEdit} /></Button>

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




                <div style={{marginTop:100}}>
                    <Container>
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Header>Payment Form.</Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.submitPayment}>
                                    <Form.Group>
                                        <Form.Label>Student ID : </Form.Label>
                                        <Form.Control required type="text"
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Student ID"
                                            name="studentID"
                                            value={this.state.studentID} onChange={this.inputChange}
                                            required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Name : </Form.Label>
                                        <Form.Control required type="text"
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Student Name"
                                            name="studentName"
                                            value={this.state.studentName} onChange={this.inputChange}
                                            required />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Amount : </Form.Label>
                                            <Form.Control required type="text"
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Amount"
                                                name="amount"
                                                min="100"
                                                value={this.state.amount} onChange={this.inputChange}
                                                required />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Payment Status : </Form.Label>
                                            <Form.Control required as="select" defaultValue="Choose..."
                                                className={"bg-dark text-white"}
                                                name="paymentStatus"
                                                required
                                                value={this.state.paymentStatus} onChange={this.inputChange}
                                            >
                                                <option>Choose...</option>
                                                <option>Unpaid</option>
                                                <option>Paid</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Session : </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Session"
                                                name="session"
                                                value={this.state.session} onChange={this.inputChange} required />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Session Time : </Form.Label>
                                            <Form.Control required as="select" defaultValue="Choose..."
                                                className={"bg-dark text-white"}
                                                name="sessionTime"
                                                required
                                                value={this.state.sessionTime} onChange={this.inputChange}
                                            >
                                                <option>Choose...</option>
                                                <option>8.30</option>
                                                <option>10.30</option>
                                                <option>12.30</option>
                                                <option>2.30</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    {/* <Form.Group>
                <Form.Label>Date : </Form.Label>
                <Form.Control required type="date"
                className={"bg-dark text-white"}
                 placeholder="Enter Date"
                 name="date" 
                 value={this.state.date} onChange={this.inputChange}/>
            </Form.Group> */}

                                    <Button size="sm" className="btn btn-success" varient="sucess" type="submit">
                                        Submit
            </Button>
                                    <Button size="sm" className="btn btn-danger" style={{ marginLeft: "10px" }}>
                                        Cancel
            </Button>
                                </Form>
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

export default PaymentStatus;