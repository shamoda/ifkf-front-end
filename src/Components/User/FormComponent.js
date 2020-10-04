import React, { Component} from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import StudentService from '../../API/StudentService';
import moment from 'moment'
import swal from 'sweetalert';
class FormComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            studentId: this.props.match.params.id,
            name:'',
            gender:'',
            address:'',
            email:'',
            nic:'',
            dob: moment(new Date()).format('YYYY-MM-DD'),
            session:'',
            phoneNo:''
        }

        
        this.SubmitStudent = this.SubmitStudent.bind(this);
        this.refreshStudent = this.refreshStudent.bind(this);
        this.cancel=this.cancel.bind(this);

    }
    
componentDidMount(){

    this.refreshStudent();
}


    refreshStudent(){

        if(this.state.id === -1){

            return
        }
        else{

            StudentService.retrieveStudent(this.state.studentId)
            .then( response => this.setState ({

                studentId: this.state.studentId,
                name:response.data.name,
                gender:response.data.gender,
                address:response.data.address,
                email:response.data.email,
                nic:response.data.nic, 
                dob:moment(response.data.dob).format('YYYY-MM-DD'),
                session:response.data.session,
                phoneNo:response.data.phoneNo
            }))
        }
    }

    cancel(){
        
        this.props.history.push('/users' );
    }


    SubmitStudent(event){


        event.preventDefault();

        let student =
            {   studentId:this.state.studentId,
                name:this.state.name,
                gender:this.state.gender,
                address:this.state.address,
                email:this.state.email,
                nic:this.state.nic,
                dob:this.state.dob,
                session:this.state.session,
                phoneNo:this.state.phoneNo
            };

        if(this.state.studentId === -1)
        {

            swal({
                title: "New Record Submitted!",
                icon: "success",
                button: "ok",
            });

            StudentService.createStudent(student)
            .then(
                response => {

                    this.props.history.push("/students")
                }

            )
         }
        else{

            swal({
                title: "Record Updated!",
                icon: "success",
                button: "ok",
            })

            StudentService.updateStudent(this.state.studentId,student)
            .then(

                response => {

                    this.props.history.push("/students")
                }
            )


        }      

    }
    
   

    StudentChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }); 
        
        }
    

    
    render() {

        const{studentId,name,gender,address,email,nic,dob,session,phoneNo} = this.state
        return (
            <div className = "container">

                    <Card className={"border border-dark  "}>
                    <Card.Header><FontAwesomeIcon icon={faEdit} /> Add Student</Card.Header>
                    <Form onSubmit={this.SubmitStudent} method="post">
                    <Card.Body>
                
                <Form.Group as={Row} controlId="formHorizontalStid">
                    <Form.Label column sm={2}>
                   Student Id
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name="studentId" placeholder="Student Id"  value ={studentId} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                   Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name ="name" placeholder="Name" value ={name} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>
                {/* <fieldset>
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        Gender
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="radio"
                        label="Male"
                        name="gender"
                        value = {gender}
                        id="male"
                        />
                        <Form.Check
                        type="radio"
                        label="Female"
                        name="gender"
                        value ={gender}
                        id="female"
                        />
                       
                    </Col>
                    </Form.Group>
                </fieldset> */}

                <Form.Group as={Row} controlId="formHorizontalAddress">
                    <Form.Label column sm={2}>
                    Address
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name ="address" placeholder="Address" value ={address} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" name ="email" placeholder="Email"  value ={email} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalNic">
                    <Form.Label column sm={2}>
                   NIC
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "nic" placeholder=" NIC"  value ={nic} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalDOB">
                    <Form.Label column sm={2}>
                  Date of Birth
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="date" name ="dob" placeholder="Date of Birth"  value ={dob} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalSession">
                    <Form.Label column sm={2}>
                    Session
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "session" placeholder="Session" value ={session} onChange ={this.StudentChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                    <Form.Label column sm={2}>
                    Contact No
                    </Form.Label>
                    <Col sm={10}>
                <Form.Control type="text" name = "phoneNo" placeholder="Contact No" value ={phoneNo} onChange ={this.StudentChange} pattern="[0-9]{10}" required/>
                    </Col>
                </Form.Group>
                
            
                </Card.Body>

                <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit" //{onClick={this.saveStudent}
                            >
                            <FontAwesomeIcon icon={faSave} /> Submit
                            </Button> {' '}
                            <Button variant="info" size="sm" type="reset" //onClick={this.cancel.bind(this)}
                            >
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            
                    </Card.Footer>
                </Form>
                </Card> 


                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default FormComponent;