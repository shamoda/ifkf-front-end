import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash, faRemoveFormat} from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';

class PaymentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            // studentID:this.props.match.params.id,
            studentID: -1,
            studentName: '',
            amount: '',
            session:'',
            sessionTime:'',
            date:'',
            paymentStatus:'',
            paymentID:'',
            sessionId:''

        }
        //this.updatePayment = this.updatePayment.bind(this);
        this.submitPayment = this.submitPayment.bind(this);

    }

    componentDidMount(){
        this.refreshPayment();
    }

    refreshPayment() {
        const getId = +this.props.match.params.id;
        if (getId != null){
        PaymentService.retrievePayment(getId)
        .then((response) => {
            this.setState({
                studentID:  response.data.studentID,
                paymentID: response.data.paymentID,
                studentName: response.data.studentName,
                amount: response.data.amount,
                session:response.data.session,
                sessionTime:response.data.sessionTime,
                date:response.data.date,
                paymentStatus:response.data.paymentStatus,
                sessionId:response.data.sessionId
            })
        })
        
        
        }}

      submitPayment(event){
        event.preventDefault();

        if (this.state.studentID === -1){
        let payment={
            studentID : this.state.studentID,
            studentName : this.state.studentName,
            amount : this.state.amount,
            session : this.state.session,
            sessionTime : this.state.sessionTime,
            date : this.state.date,
            paymentStatus : this.state.paymentStatus,
            sessionId : this.state.sessionId

        };

        PaymentService.addPayments(payment).then((response)=> {
            this.props.history.push("/studentList");
        })

      }
        else{

            let payment={
            paymentID: this.state.paymentID,
            studentID : this.state.studentID,
            studentName : this.state.studentName,
            amount : this.state.amount,
            session : this.state.session,
            sessionTime : this.state.sessionTime,
            date : this.state.date,
            paymentStatus : this.state.paymentStatus,
            sessionId : this.state.sessionId

        };

        PaymentService.addPayments(payment).then((response)=> {
            this.props.history.push("/studentList");
        })

        }

    }


    inputChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

  //  updatePayment = (e) => {
  //      e.preventDefault();
 //       let payments = {studentID: this.state.studentID,
  //          studentName: this.state.studentName,
 //           amount: this.state.amount,
 //           session: this.state.session,
 //           sessionTime: this.state.sessionTime,
 //           date: this.state.date};
 //       console.log('payments => ' + JSON.stringify(payments));
 //       this.props.history.push('/Payments')
 //   }

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
                                 required/>
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
                                    required/>
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
                                    value={this.state.session} onChange={this.inputChange} required/>
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