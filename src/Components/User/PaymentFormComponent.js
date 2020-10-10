import React, { Component} from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';
import moment from 'moment'

class PaymentFormComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            paymentId: this.props.match.params.id,
            name:'',
           amount:'',
           status:'',
           session:'',
           sessiontime:'',
           date:''
            
        }

        this.SubmitPayment=this.SubmitPayment.bind(this)
    }

    SubmitPayment(event){


        event.preventDefault();

        let payment =
            {   paymenttId:this.state.studentId,
                name:this.state.name,
                amount:this.state.amount,
                //status:this.state,status,
                session:this.state.session,
                sessiontime:this.state.sessiontime,
                date:this.state.date
            
               
            };

        if(this.state.paymentId === -1)
        {
            PaymentService.createPayment(payment)
            .then(
                response => {

                    this.props.history.push("/payments")
                }

            )
         }
        else{

            PaymentService.updateStudent(this.state.paymentId,payment)
            .then(

                response => {

                    this.props.history.push("/payments")
                }
            )


        }      

    }

    paymentChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }); 
        
        }
    
    render() {
        const{paymentId,name,amount,status,session,sessiontime,date} = this.state
        return (
            <div className= "container">
                         <Form onSubmit={this.submitPayment}>
                            <Form.Group>
                                <Form.Label>Payment ID : </Form.Label>
                                <Form.Control required type="text"
                                className={"bg-dark text-white"}
                                placeholder="Enter Student ID"
                                name="paymentId"
                                value={paymentId} onChange={this.paymentChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Name : </Form.Label>
                                <Form.Control required type="text"
                                className={"bg-dark text-white"}
                                 placeholder="Enter Student Name"s
                                 name="name" 
                                 value={name} onChange={this.paymentChange}/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Amount : </Form.Label>
                                    <Form.Control required type="text"
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Amount" 
                                    name="amount"
                                    value={amount} onChange={this.paymentChange}/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Payment Status : </Form.Label>
                                    <Form.Control required as="select" defaultValue="Choose..."
                                    className={"bg-dark text-white"}
                                    name="status"
                                    value={status} onChange={this.paymentChange} 
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
                                    value={session} onChange={this.paymentChange} required/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Session Time : </Form.Label>
                                    <Form.Control required as="select" defaultValue="Choose..."
                                    className={"bg-dark text-white"}
                                    name="sessiontime"
                                    value={sessiontime} onChange={this.paymentChange} 
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
                                 value={date} onChange={this.paymentChange}/>
                            </Form.Group>
                            
                            <Button size="sm" className="btn btn-success" >
                                Submit
                            </Button>
                            <Button size="sm" className="btn btn-danger"  style={{marginLeft: "10px"}}>
                                Cancel
                            </Button>
                        </Form> 
            </div>
        );
    }
}

export default PaymentFormComponent;