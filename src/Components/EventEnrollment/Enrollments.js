import React, { Component } from 'react';
import { Card,Form,Col,Button, Container,ButtonGroup,InputGroup, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faEdit,faTrash,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons'
import { } from 'react-router-dom';
import StudentService from '../../API/StudentService';
import moment from 'moment'


class Enrollments extends Component {
    constructor(props){
        super (props)
        this.state={
            unregStudent: [],
            regStudent: [],
            filterkyu:'',
            search: ''

            // dob: moment(new Date()).format('YYYY-MM-DD')
            //btnValue: 1
        }
        this.refreshEnrollment =this.refreshEnrollment.bind(this);
        this.refreshRegStudents = this.refreshRegStudents.bind(this);
    }

    componentDidMount(){
        this.refreshEnrollment();
        this.refreshRegStudents();
    }
    
    refreshRegStudents(){
        
        StudentService.retrieveRegStudent()
        .then(
            response => {
                this.setState({regStudent : response.data})
            }
        )
    }


    refreshEnrollment(){

        StudentService.retrieveAllEnrollments()
        .then(
            response => {
                this.setState({unregStudent : response.data})
            }
        )

        // if(this.state.btnValue === 1){
        //     StudentService.retrieveAllEnrollments()
        //     .then(
        //         response => {
        //             this.setState({unregStudent : response.data})
        //         }
        //     )
        // }
        // else{
        //     StudentService.retrieveRegStudent()
        //     .then(
        //         response => {
        //             this.setState({regStudent : response.data})
        //         }
        //     )
        // }
        
    }

    deleteStudentsClick(id){
        StudentService.deleteEnrollment(id)
        .then(() => this.refreshEnrollment())
        // .then(
        //     response =>{
        //         this.setState({message: `Delete of Enrollment ${id} Successful`})
        //     }
        // )

        // if(this.state.btnValue === 1){
        //     StudentService.deleteEnrollment(id)
        //     .then(() => this.refreshEnrollment())
        // }
        // else{
        //     StudentService.deleteRegStudent(id)
        //     .then(() => this.refreshEnrollment())
        // }
    }

    deleteRegStudent(id){
        StudentService.deleteRegStudent(id)
        .then(() => this.refreshRegStudents())
    }

    updateStudentClicked(id){
        this.props.history.push(`/enrollmentform/${id}`)
    }

    searchData = () => {
        if(this.state.search !== ''){
            StudentService.searchStudent(this.state.search)
            .then(
                response => {
                    if(response.data.length >= 1){
                        this.setState({unregStudent : response.data})
                        console.log(response.data.name)
                    }
                }
            )
        }
        console.log("print")
    }

    // searchChange =() =>{
    //     this.setState({search: this.state.search});
    // };


    searchChange = event =>{
        this.setState({
            search : event.target.value
        });

        console.log(this.state.search);
    }

    filterChangeKyu = event =>{
        this.setState({filterkyu: event.target.value});
        console.log(this.state.filterkyu)
    };

    filterData = () =>{
        if(this.state.kyu !== '' || this.state.weight !== ''){
            StudentService.filterByKyu(this.state.filterkyu)
            .then(
                response => {
                    if(response.data.length >= 1){
                        this.setState({unregStudent: response.data})
                        console.log("filter by kyu")
                    }
                }
            )
        }
    }

    canselFilter = () =>{
        this.setState({
                    filterkyu: ''
        })
        this.componentDidMount();
    }

    cancelSearch = () =>{
        this.setState({
                    search: ''
        })
        this.componentDidMount();
    }


    // buttonValueClicked(btn){
    //     this.setState.btnValue = btn;
    // }

    render() { 

        const searchBox = {
            border : "1.5px solid #24a0ed"
        }

        return ( 
            <div>
                <Container className="mb-3" fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Body>
                            <Form.Row>
                            <Card.Header style={{fontSize:'20px'}}>Filter By:</Card.Header>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Kyu: </Form.Label>                              
                            <Form.Control as={"select"} autoComplete="off" value={this.state.filterkyu} onChange={this.filterChangeKyu} className={"bg-dark text-white"} >
                                <option value={" "} >---All---</option>
                                <option value={"10,9,8,7"}>10 09 08 07</option>
                                <option value={"6,5,4"}>06 05 04</option>
                                <option value={"3,2,1"}>03 02 01</option>
                                <option value={"Black"}>Black</option>
                            </Form.Control>
                            <ButtonGroup>
                                    <Button size="sm" variant="outline-primary" onClick={() => this.filterData()}><FontAwesomeIcon icon={faSearch} /></Button>
                                    <Button size="sm" variant="outline-primary" onClick={() => this.canselFilter()}><FontAwesomeIcon icon={faTimes} /></Button>
                            </ButtonGroup>
                            <Form.Control style={searchBox} autoComplete="off" placeholder="Search" name="search" value={this.state.search} className="bg-dark text-white" onChange={this.searchChange}  />&nbsp;
                                    <InputGroup.Append>
                                        <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                                        <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes}  /></Button>
                                    </InputGroup.Append>
                            </Form.Group>
                            </Form.Row>
                        </Card.Body>
                    </Card>
                </Container>

                {/* <Container className="mb-3" fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>      
                <Card className={"border border-dark bg-dark text-white"}>
                        <button className={"border border-dark bg-dark text-white"} onClick={() => this.buttonValueClicked(1)}>Unregistered Students</button>
                        <button className={"border border-dark bg-dark text-white"} onClick={() => this.buttonValueClicked(2)}>Registered Students</button>
                </Card>
                </Container> */}


                <Container fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header style={{fontSize:'30px'}}><FontAwesomeIcon icon={faList} /> Currant Enrollemnts For This Event</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>                        
                    <thead>
                        <tr>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>NIC</th>                            
                        <th>Date of Birth</th>
                        <th>Weight</th>
                        <th>kyu</th>
                        <th>Phone</th>
                        <th>E-mail</th>
                        <th>Guardian Name</th>
                        <th>Guardian Phone</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.unregStudent.map(
                                std=>
                                <tr key = {std.id}>
                                    <td>{std.id}</td>
                                    <td>{std.name}</td>
                                    <td>{std.address}</td>
                                    <td>{std.nic}</td>
                                    <td>{moment(std.dob).format('YYYY-MM-DD')}</td>
                                    <td>{std.weight}</td>
                                    <td>{std.kyu}</td>
                                    <td>{std.phone}</td>
                                    <td>{std.email}</td>
                                    <td>{std.guardianName}</td>
                                    <td>{std.guardianPhone}</td>
                                    <ButtonGroup>
                                        <Button size="sm" variant="outline-primary" onClick={() => this.updateStudentClicked(std.id)}><FontAwesomeIcon icon={faEdit} /></Button> {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                        <Button size="sm" variant="outline-danger" onClick={() => this.deleteStudentsClick(std.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </tr>
                            )
                        }
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>
                </Container>   
    
                <br>
                </br>
            {/* </div>

            <div> */}
                <Container fluid style={{paddingRight:"15%", paddingLeft:"15%"}}>
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{fontSize:'30px'}}><FontAwesomeIcon icon={faList} /> Currant Enrolled IFKF Students For This Event</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                        <thead>
                            <tr>
                            <th>Enrollment Id</th>
                            <th>Student Id</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Weight</th>
                            <th>kyu</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.regStudent.map(
                                    regstd=>
                                    <tr key = {regstd.enrollId}>
                                        <td>{regstd.enrollId}</td>
                                        <td>{regstd.studId}</td>
                                        <td>{regstd.name}</td>
                                        <td>{moment(regstd.dob).format('YYYY-MM-DD')}</td>
                                        <td>{regstd.weight}</td>
                                        <td>{regstd.kyu}</td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-danger" onClick={() => this.deleteRegStudent(regstd.enrollId)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </ButtonGroup>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    </Card.Body>
                    </Card>
                </Container>   
    
                <br />
                <br />
                <br/>
                <br />
    
            </div>
        );    
    }
}

export default Enrollments;