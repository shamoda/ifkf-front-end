import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash, faRemoveFormat} from '@fortawesome/free-solid-svg-icons'

class PaymentForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            studentId: '',
            studentName: '',
            amount: '',
            session:'',
            sessiontime:'',
            date:'',
            paymentstatus:''

        }
        this.updatePayment = this.updatePayment.bind(this);

    }

    inputChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    updatePayment = (e) => {
        e.preventDefault();
        let payments = {studentId: this.state.studentId,
            studentName: this.state.studentName,
            amount: this.state.amount,
            session: this.state.session,
            sessionTime: this.state.sessionTime,
            date: this.state.date};
        console.log('payments => ' + JSON.stringify(payments));
        this.props.history.push('/Payments')
    }

    cancel(){
        this.props.history.push('/Payments')
    }
    render(){
        return(
            <div>
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
                                name="studentId"
                                value={this.state.studentId} onChange={this.inputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Name : </Form.Label>
                                <Form.Control required type="text"
                                className={"bg-dark text-white"}
                                 placeholder="Enter Student Name"
                                 name="studentName" 
                                 value={this.state.name} onChange={this.inputChange}/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Amount : </Form.Label>
                                    <Form.Control required type="text"
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Amount" 
                                    name="amount"
                                    value={this.state.amount} onChange={this.inputChange}/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Payment Status : </Form.Label>
                                    <Form.Control required as="select" defaultValue="Choose..."
                                    className={"bg-dark text-white"}
                                    name="paymentstatus"
                                    value={this.state.paymentstatus} onChange={this.inputChange} 
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
                                    value={this.state.session} onChange={this.inputChange} required/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Session Time : </Form.Label>
                                    <Form.Control required as="select" defaultValue="Choose..."
                                    className={"bg-dark text-white"}
                                    name="sessiontime"
                                    value={this.state.sessiontime} onChange={this.inputChange} 
                                    >
                                    <option>Choose...</option>
                                    <option>8.30 am</option>
                                    <option>10.30 am</option>
                                    <option>12.30 pm</option>
                                    <option>2.30 pm</option>
                                    <option>8.30 pm</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label>Date : </Form.Label>
                                <Form.Control required type="text"
                                className={"bg-dark text-white"}
                                 placeholder="Enter Date"
                                 name="date" 
                                 value={this.state.date} onChange={this.inputChange}/>
                            </Form.Group>
                            
                            <Button size="sm" className="btn btn-success" onClick={this.inputChange}>
                                Submit
                            </Button>
                            <Button size="sm" className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>
                                Cancel
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Container>  
            </div>
              
        )
    }
}
export default PaymentForm;