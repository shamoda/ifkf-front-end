import React, { Component} from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup, FormGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import StudentService from '../../API/StudentService';
import SessionService from '../../API/SessionService';
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
            sessionId:[],
            optionList:[],
            phoneNo:''
        }

        
        this.SubmitStudent = this.SubmitStudent.bind(this);
        this.refreshStudent = this.refreshStudent.bind(this);
        this.cancel=this.cancel.bind(this);

    }
    
componentDidMount(){

    this.refreshStudent();

   SessionService.getSessions()
            .then(
                response => {
                    
                    this.setState({optionList:response.data.map(code =>
                        <option id="code.sessionId">
                            {code.sessionId}
                        </option>
                    )})
                }
            )
}


    refreshStudent(){

        if(this.state.id === -1){

            return
        }
        else{

            StudentService.retrieveStudent(this.state.studentId)
            .then( response => {
                if(response.data != null){
                this.setState ({

                studentId: this.state.studentId,
                name:response.data.name,
                gender:response.data.gender,
                address:response.data.address,
                email:response.data.email,
                nic:response.data.nic, 
                dob:moment(response.data.dob).format('YYYY-MM-DD'),
                sessionId:response.data.sessionId,
                phoneNo:response.data.phoneNo
            })}
        }
            )
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
                sessionId:this.state.sessionId,
                phoneNo:this.state.phoneNo
            };

        console.log(student)

            StudentService.createStudent(student)
            .then(

                response => {

                    this.props.history.push("/students")
                }
            )
  

    }
    
   

    StudentChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }); 
        
        }
    
    demoClicked(){
        this.setState({
            name:'Nimesha Abesinghe',
            gender:'Female',
            address:'Malabe',
            email:'nimeshaabesinghe@gmail.com',
            nic:'97452221846V',
            dob: '1997-05-12',
            sessionId:'3',
            phoneNo:'0707654164'
        })
    }    
    
    render() {

        const{studentId,name,gender,address,email,nic,dob,sessionId,phoneNo} = this.state
        return (
            <div className = "container" style ={{marginTop:30}}>

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
                
                <FormGroup  as={Row} controlId="formHorizontalGender">
                <Form.Label column sm={2}>Gender :</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="select"
                    value={gender}
                    name="gender"
                    onChange={this.StudentChange}
                    required
                  >
                      <option value={"gender"}>Select Gender</option>
                     <option value={"male"}>Male</option>
                    <option value={"female"}>
                     Female
                    </option>
                 </Form.Control>
                </Col>
                </FormGroup>

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
                    <Form.Control  as = "select" name = "sessionId" placeholder="Session" value ={sessionId} onChange ={this.StudentChange} autoComplete ="off" >
                    {this.state.optionList}
                    </Form.Control>
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

                            <Button size = "sm" onClick={() => this.demoClicked()}>Demo</Button>
                            
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