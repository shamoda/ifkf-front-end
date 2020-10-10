import React, { Component} from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup, FormGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import InstructorService from '../../API/InstructorService';
import moment from 'moment'
import swal from 'sweetalert';

class InstructorFormComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            instructorId: this.props.match.params.id,
            name:'',
            gender:'',
            address:'',
            email:'',
            nic:'',
            dob: moment(new Date()).format('YYYY-MM-DD'),
            phoneNo:'',
            qualifications:'',
            experience:''
        }

        
        this.SubmitInstructor = this.SubmitInstructor.bind(this);
        this.refreshInstructor = this.refreshInstructor.bind(this);
        this.cancel=this.cancel.bind(this);

    }
    
componentDidMount(){

    this.refreshInstructor();
}


    refreshInstructor(){

        if(this.state.id === -1){

            return
        }
        else{

            InstructorService.retrieveInstructor(this.state.instructorId)
            .then( response => {
                if(response.data != null){
                this.setState ({

                instructorId: this.state.instructorId,
                name:response.data.name,
                gender:response.data.gender,
                address:response.data.address,
                email:response.data.email,
                nic:response.data.nic, 
                dob:moment(response.data.dob).format('YYYY-MM-DD'),
                phoneNo:response.data.phoneNo,
                qualifications:response.data.qualifications,
                experience:response.data.experience
            })}
        }
            
            )
        }
    }

    cancel(){
        
        this.props.history.push('/instructors' );
    }


    SubmitInstructor(event){


        event.preventDefault();

        let instructor =
        
            {    instructorId:this.state. instructorId,
                name:this.state.name,
                gender:this.state.gender,
                address:this.state.address,
                email:this.state.email,
                nic:this.state.nic,
                dob:this.state.dob,
                phoneNo:this.state.phoneNo,
                qualifications:this.state.qualifications,
                experience:this.state.experience
            };

        // if(this.state.instructorId === -1)
        // {
        //     swal({
        //         title: "New Record Submitted!",
        //         icon: "success",
        //         button: "ok",
        //     });

        //    InstructorService.createInstructor(instructor)
        //     .then(
        //         response => {

        //             this.props.history.push("/instructors")
        //         }

        //     )
        //  }
        // else{

            // swal({
            //     title: "Record Updated!",
            //     icon: "success",
            //     button: "ok",
            // })


            InstructorService.createInstructor(instructor)
            .then(

                response => {

                    this.props.history.push("/instructors")
                }
            )


        // }      

    }
    
   

    InstructorChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }); 
        
        }
    
    demoClicked(){
            this.setState({
            
                name:'Palitha Silva',
                gender:'Male',
                address:'Colombo 10',
                email:'palithas@gmail.com',
                nic:'674286175V',
                dob: '1967-03-01',
                phoneNo:'0776489275',
                qualifications:'Degree',
                experience:'16years'
            })
        }    
    
    render() {

        const{instructorId,name,gender,address,email,nic,dob,phoneNo,qualifications,experience} = this.state
        return (
            <div className = "container" style ={{marginTop:30}}>

                    <Card className={"border border-dark "}>
                    <Card.Header><FontAwesomeIcon icon={faEdit} /> Add Instructor</Card.Header>
                    <Form onSubmit={this.SubmitInstructor} method="post">
                    <Card.Body>
                
                <Form.Group as={Row} controlId="formHorizontalStid">
                    <Form.Label column sm={2}>
                  Instructor Id
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name="instructorId" placeholder="Instructor Id"  value ={instructorId} onChange ={this.InstructorChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                   Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name ="name" placeholder="Name" value ={name} onChange ={this.InstructorChange} />
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

<FormGroup  as={Row} controlId="formHorizontalGender">
                <Form.Label column sm={2}>Gender :</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="select"
                    value={gender}
                    name="gender"
                    onChange={this.InstructorChange}
                    required
                  >
                      <option value={"gender"}>Select Gender</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                 </Form.Control>
                </Col>
                </FormGroup>
                <Form.Group as={Row} controlId="formHorizontalAddress">
                    <Form.Label column sm={2}>
                    Address
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name ="address" placeholder="Address" value ={address} onChange ={this.InstructorChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" name ="email" placeholder="Email"  value ={email} onChange ={this.InstructorChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalNic">
                    <Form.Label column sm={2}>
                   NIC
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "nic" placeholder=" NIC"  value ={nic} onChange ={this.InstructorChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalDOB">
                    <Form.Label column sm={2}>
                  Date of Birth
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="date" name ="dob" placeholder="Date of Birth"  value ={dob} onChange ={this.InstructorChange} />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row} controlId="formHorizontalSession">
                    <Form.Label column sm={2}>
                    Session
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "session" placeholder="Session" value ={session} onChange ={this.InstructorChange}/>
                    </Col>
                </Form.Group> */}
                <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                    <Form.Label column sm={2}>
                    Contact No
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "phoneNo" placeholder="Contact No" value ={phoneNo} onChange ={this.InstructorChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalQualifications">
                    <Form.Label column sm={2}>
                    Qualifications
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "qualifications" placeholder="Qualifications" value ={qualifications} onChange ={this.InstructorChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalExperience">
                    <Form.Label column sm={2}>
                    Experience
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name = "experience" placeholder="Experience" value ={experience} onChange ={this.InstructorChange}/>
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

export default InstructorFormComponent;