import React, { Component } from 'react';
import { Card, Form, Button,Row, Col, Container } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faEdit} from '@fortawesome/free-solid-svg-icons'
import EnrollStudentService from '../../API/EnrollStudentService';
import moment from 'moment'
import swal from 'sweetalert';



class RegStudentForm extends Component {
    constructor(props){
        super(props)
        this.state={
            studId: '',
            weight:'',
            name:'',
            kyu:'',
            dob:moment(new Date()).format('YYYY-MM-DD'),
            eID: this.props.match.params.id
        }
        //this.refreshRegStudent = this.refreshRegStudent.bind(this);
        this.addStudentClicked = this.addStudentClicked.bind(this);
    }
    
    addStudentClicked(event) {
        event.preventDefault();

        let regStudent ={
            studId: this.state.studId,
            weight: this.state.weight,
            name: this.state.name,
            kyu: this.state.kyu,
            dob: this.state.dob,
            eID: this.state.eID
        };

        swal({
            title: "New Record Submitted!",
            icon: "success",
            button: "Ok",
        });
        EnrollStudentService.insertRegStudent(this.state.eID, regStudent)
        .then(() => this.props.history.push(`/enrollments/${this.state.eID}`))
        // console.log("Push")
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
            weight: '50kg',
            kyu: '10,9,8,7',
            eID: this.state.eID
        })
    }
    render() { 


        const {studId,weight,name,kyu,dob} = this.state

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
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Student Id</Form.Label>
                                <Form.Control type="text" name="studId" value={studId} onChange={this.studChange} required autoComplete="off" placeholder="Student Id" className={"bg-dark text-white"} />
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
                            <Form.Group as={Col} controlId="formGridIsbn">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" name="dob" value={dob}  onChange={this.studChange} required autoComplete="off" placeholder="YYYY.MM.DD" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>

                    <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Save
                            </Button> {' '}
                            <Button size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                    </Card.Footer>
                    </Form>
                    </Card>
                </Container>    

            <br/>
            <br />
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
 
export default RegStudentForm;