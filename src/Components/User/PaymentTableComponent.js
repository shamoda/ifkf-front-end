import React, { Component } from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';

class PaymentTableComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
           payments : []
        }
        this.addPayment = this.addPayment.bind(this)
    }

    addPayment(){
        this.props.history.push('/addPayment');
    }

    componentDidMount(){
       PaymentService.getPayments().then((res) => {
            this.setState({payments:res.data});
        });
    }

    UpdatePaymentClicked(id){


        this.props.history.push(`/addPayment/${id}`)

    
      
    }
    render() {
        return (
            <div className="container fluid">
               
                
               
                 <Card className={"border border-dark "}>
                <Card.Header><FontAwesomeIcon icon={faList} />Payments List</Card.Header>
                <Card.Body>
                <div className = "button-margin">
                    <Button variant="primary" type="submit" onClick ={this.addPayment}>
                    Add Payment
                </Button>
                </div>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>PaymentId</th>
                        <th>StudentId</th>
                        <th>SessionId</th>
                        <th>Name</th>
                        <th>PaymentStatus</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                this.state.payments.map(
                                    payment =>
                                    <tr key = {payment.paymentId}>
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.studentId}</td>
                                        <td>{payment.sessionId}</td>
                                        <td>{payment.name}</td>
                                        <td>{payment.status}</td>
                                        <td>
                                    <ButtonGroup>
                                
                                        <Button size="sm" variant="primary" style ={{marginRight:20}} onClick ={() => this.UpdatePaymentClicked(payment.paymentId)}><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>

                                    </ButtonGroup>
                                    

                                      
                                    </td>
                                    </tr>

                                )
                            }
                            
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>


                
            </div>
        );
    }
}

export default PaymentTableComponent;
