import React, { Component } from 'react';
import { Card, Form, Button,Row, Col, Container } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faEdit} from '@fortawesome/free-solid-svg-icons'
import EnrollStudentService from '../../API/EnrollStudentService';
import moment from 'moment'
import swal from 'sweetalert';



class EnrollmentForm extends Component {
    constructor(props){
        super(props)
        this.state={
            id:-1,
            name:'',
            address:'',
            nic:'',
            dob:moment(new Date()).format('YYYY-MM-DD'),
            weight:'',
            kyu:'',
            phone:'',
            email:'',
            guardianName:'',
            guardianPhone:'',
            getId: null,
            eID: this.props.match.params.eid
            // eID: 9
        }
        this.refreshUnregStudent = this.refreshUnregStudent.bind(this);
        this.addStudentClicked = this.addStudentClicked.bind(this);
    }
    componentDidMount(){
        this.refreshUnregStudent();
    }
    refreshUnregStudent(){

        let resultsId = this.props.match.params.id;

        if(resultsId != null){
            EnrollStudentService.retriveEnrollmrnts(resultsId)
            .then(response => this.setState({
            id: response.data.id,
            name: response.data.name,
            address: response.data.address,
            nic: response.data.nic,
            dob:  moment(response.data.dob).format('YYYY-MM-DD'),
            weight: response.data.weight,
            kyu: response.data.kyu,
            phone:response.data.phone,
            email: response.data.email,
            guardianName: response.data.guardianName,
            guardianPhone: response.data.guardianPhone,
            eID: response.data.eid
        }))

        // console.log(`respons${}`)

        return

        }

        else{
            
            return
        }
        
    }


    
    addStudentClicked(event) {
        event.preventDefault();

        // console.log("LLEID"+this.state.eID)
        //const getId = +this.props.match.params.id;

        if(this.state.id === -1){

        let stud ={
            name: this.state.name,
            address: this.state.address,
            nic: this.state.nic,
            dob: this.state.dob,
            weight: this.state.weight,
            kyu: this.state.kyu,
            phone:this.state.phone,
            email: this.state.email,
            guardianName: this.state.guardianName,
            guardianPhone: this.state.guardianPhone,
            eID: this.state.eID
        };

            swal({
                title: "New Record Submitted!",
                icon: "success",
                button: "Ok",
            });
            
            EnrollStudentService.insertEnrollment(this.state.eID,stud)
            .then(() => this.props.history.push(`/enrollments/${stud.eID}`))
        }

        else{

            let stud ={
                id: this.state.id,
                name: this.state.name,
                address: this.state.address,
                nic: this.state.nic,
                dob: this.state.dob,
                weight: this.state.weight,
                kyu: this.state.kyu,
                phone:this.state.phone,
                email: this.state.email,
                guardianName: this.state.guardianName,
                guardianPhone: this.state.guardianPhone,
                eID: this.state.eID
            };

            swal({
                title: "Record Successfully Updated!",
                icon: "success",
                button: "Ok",
            });
            console.log("update eid:"+stud.eID)
            EnrollStudentService.updateEnrollment(this.state.eID,stud)
            .then(()=> this.props.history.push(`/enrollments/${stud.eID}`))
        }
    }

    studChange = stud =>{
        this.setState({
            [stud.target.name] : stud.target.value
        });
    };

    demoClicked(){
        this.setState({
            studId: '00',
            name: 'Demo',
            address: 'Demo Address',
            nic: '0000000000V',
            weight: '50kg',
            kyu: '10,9,8,7',
            phone:'1234567890',
            email: 'demo@gmail.com',
            guardianName: 'Demo Guardian',
            guardianPhone: '1789456230',
            eID: this.state.eID
        })
    }
    render() { 


        const {name,address,nic,dob,weight,kyu,phone,email,guardianName,guardianPhone,eID} = this.state

        return ( 
            <div>
                <br></br>
                <Container>
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{fontSize:'30px'}}>
                    <Row>
                        <Col><FontAwesomeIcon icon={faEdit} />Add Entry</Col>
                        {/* <Col style={{float:'right'}}>Student ID: {id}</Col> */}
                    </Row>
                    </Card.Header>
                    <Form onSubmit={this.addStudentClicked} method="post">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={name}  onChange={this.studChange} required autoComplete="off" placeholder="Name" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={address}  onChange={this.studChange} required autoComplete="off" placeholder="Address" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridUrl">
                                <Form.Label>NIC</Form.Label>
                                <Form.Control type="text" name="nic" value={nic}  onChange={this.studChange} required autoComplete="off" placeholder="##########V" className={"bg-dark text-white"} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridIsbn">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" value={dob}  onChange={this.studChange} required autoComplete="off" placeholder="YYYY.MM.DD" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridUrl">
                                <Form.Label>weight</Form.Label>
                                <Form.Control type="text" name="weight" value={weight}  onChange={this.studChange} required autoComplete="off" placeholder="##kg" className={"bg-dark text-white"} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLanguage">
                            <Form.Label>Kyu</Form.Label>
                            <Form.Control as={"select"} name="kyu" value={kyu}  onChange={this.studChange} required autoComplete="off" className={"bg-dark text-white"} >
                                <option value={"---"}>---</option>
                                <option value={"10,9,8,7"}>10 09 08 07</option>
                                <option value={"6,5,4"}>06 05 04</option>
                                <option value={"3,2,1"}>03 02 01</option>
                                <option value={"Black"}>Black</option>
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridUrl">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="phone" name="phone" value={phone}  onChange={this.studChange} required autoComplete="off" pattern="[0-9]{10}" placeholder="0123456789" className={"bg-dark text-white"} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridIsbn">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name="email" value={email}  onChange={this.studChange} required autoComplete="off" placeholder="Example@gmail.com" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Guardian Name</Form.Label>
                                <Form.Control type="text" name="guardianName" value={guardianName}  onChange={this.studChange} required autoComplete="off" placeholder="Guardian Name" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridLanguage">
                            <Form.Label>Guardian Phone</Form.Label>
                            <Form.Control type="phone" name="guardianPhone" value={guardianPhone}  onChange={this.studChange} required autoComplete="off" pattern="[0-9]{10}" placeholder="Guardian Phone" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>  
                    </Card.Body>

                    <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Save
                            </Button> {' '}
                            <Button size="sm" type="reset" >
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                    </Card.Footer>
                    </Form>
                    </Card>
                </Container>    

            <br/>
            <br />
            <Container fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                        <Button style={{textAlign:"center"}} onClick={() => this.demoClicked()}>Demo</Button>
            </Container> 
            <br>
            </br>
            <br>
            </br>

            </div>
         );
    }
}
 
export default EnrollmentForm;