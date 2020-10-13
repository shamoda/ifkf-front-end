import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash, faRemoveFormat} from '@fortawesome/free-solid-svg-icons'
import PaymentService from '../../API/PaymentService';
import moment from 'moment'
import { withRouter} from 'react-router-dom';

class PaymentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            payments: [], 

            // studentID:this.props.match.params.id,
            studentid: this.props.match.params.id,
            amount: '',
            date: moment(new Date()).format('YYYY-MM-DD'),
            paymentid: '',
            month:'',
            

        }
        this.updatePayment = this.updatePayment.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
        this.refreshPayment = this.refreshPayment.bind(this);
        this.deletePayment = this.deletePayment.bind(this)
    }

    componentDidMount(){
        this.refreshPayment();
    }

    refreshPayment() {
        // const getId = +this.props.match.params.id;
        // if (getId != null){
        PaymentService.retrievePayment(this.state.studentid)
        .then((response) => {
                this.setState({
                    payments: response.data
                })
            })
        }



      submitPayment(event){
        event.preventDefault();

        if (this.state.studentid === -1){
        let payment={
            studentID : this.state.studentid,
            amount : this.state.amount,
            date : this.state.date,
            month : this.state.month
        };

        PaymentService.addPayments(payment).then((response)=> {
            this.props.history.push("/studentList");
        })
      }
        else{

            let payment={
            paymentID: this.state.paymentid,
            studentID : this.state.studentid,
            amount : this.state.amount,
            date : this.state.date,
            month : this.state.month
        };

        PaymentService.addPayments(payment).then((response)=> {
            this.props.history.push("/studentList");
        })

        }

     }


     deletePayment(paymentID) {
        PaymentService.deletePayment(paymentID)
            .then(response => {
                this.refreshPayment()
            })
    }
    


    inputChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }


   updatePayment(id){
       PaymentService.getPayment(id)
       .then(response => {
           console.log(id)
           this.setState({
               paymentid:response.data.paymentID,
               studentid:response.data.studentID,
               amount:response.data.amount,
               date:moment(response.data.date).format('YYYY-MM-DD'),
               month:response.data.month
           })
       })
   }



    cancel(){
        this.props.history.push('/Payments')
    } 

    demoClicked(){
        this.setState({
            amount: '2000.00',
            month:'DemoMonth',
        })
    }


    render(){
        
        return(
            <div>
<br/>
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
                                name="studentid"
                                value={this.state.studentid} onChange={this.inputChange}
                                required />
                            </Form.Group>

                            
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
                                <Form.Label>Date : </Form.Label>
                                <Form.Control required type="Date"
                                className={"bg-dark text-white"}
                                placeholder="Enter Amount" 
                                name="date"
                                value={this.state.date} onChange={this.inputChange}
                                required/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Month : </Form.Label>
                                <Form.Control required type="text"
                                className={"bg-dark text-white"}
                                placeholder="Enter Month" 
                                name="month"
                                value={this.state.month} onChange={this.inputChange}
                                required/>
                            </Form.Group>
                            
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
                <br/> 
                <Container>
                    <Button size="sm" variant="outline-info" onClick={() => this.demoClicked()} >Demo</Button>
                </Container>
            </div>
<br/>
<br/>

            <Container>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <div style={{float:"left"}}>
                            <FontAwesomeIcon icon={faList} /> Payment Records
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Payment ID</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Month</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.payments.map((payment) => (
                                    <tr key={payment.paymentID}>
                                        <td>{payment.paymentID}</td>
                                        <td>{payment.amount}</td>
                                        <td>{moment(payment.date).format('YYYY-MM-DD')}</td>
                                        <td>{payment.month}</td>
                                        <td>      
                                            <Button size="sm" variant="outline-info" onClick={() => this.updatePayment(payment.paymentID)}>Update  <FontAwesomeIcon icon={faEdit} /></Button>&ensp;       
                                            <Button size="sm" variant="outline-danger" onClick={() => this.deletePayment(payment.paymentID)} >Delete <FontAwesomeIcon icon={faTrash} /></Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
                <br/>
                {/* <Container fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                        <Button style={{textAlign:"center"}} onClick={() => this.demoClicked()}>Demo</Button>
                </Container>  */}
                
            
            </div>
              
        )
    }
}
export default withRouter(PaymentForm);