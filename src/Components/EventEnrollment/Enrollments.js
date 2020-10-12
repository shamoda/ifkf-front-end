import React, {Component} from 'react';
import {Card, Form, Col, Button, Container, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {} from 'react-router-dom';
import EnrollStudentService from '../../API/EnrollStudentService';
import moment from 'moment'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


class Enrollments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unregStudent: [],
            regStudent: [],
            filterkyu: '',
            search: '',
            eID: this.props.match.params.id

            // dob: moment(new Date()).format('YYYY-MM-DD')
            //btnValue: 1
        }
        this.refreshEnrollment = this.refreshEnrollment.bind(this);
        this.refreshRegStudents = this.refreshRegStudents.bind(this);
    }

    componentDidMount() {
        this.refreshEnrollment();
        this.refreshRegStudents();
    }

    refreshRegStudents() {

        EnrollStudentService.retrieveRegStudent()
            .then(
                response => {
                    this.setState({regStudent: response.data})
                }
            )
    }


    refreshEnrollment() {

        EnrollStudentService.retrieveAllEnrollments()
            .then(
                response => {
                    this.setState({unregStudent: response.data})
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

    deleteStudentsClick(id) {
        EnrollStudentService.deleteEnrollment(id)
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

    deleteRegStudent(id) {
        EnrollStudentService.deleteRegStudent(id)
            .then(() => this.refreshRegStudents())
    }

    updateStudentClicked(id) {
        this.props.history.push(`/enrollmentform/${id}`)
    }

    searchData = () => {
        this.searchDataReg()
        if (this.state.search !== '') {
            EnrollStudentService.searchStudent(this.state.search)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({unregStudent: response.data})
                            console.log(response.data.name)
                        } else {
                            alert("No results in unregisterd students")
                        }
                    }
                )
        }
        console.log("print")
    }

    searchDataReg = () => {
        if (this.state.search !== '') {
            EnrollStudentService.searchStudentReg(this.state.search)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({regStudent: response.data})
                            console.log(response.data.name)
                        } else {
                            alert("No results in registerd students")
                        }
                    }
                )
        }
        console.log("print Reg")
    }

    // searchChange =() =>{
    //     this.setState({search: this.state.search});
    // };


    searchChange = event => {
        this.setState({
            search: event.target.value
        });

        console.log(this.state.search);
    }

    filterChangeKyu = event => {
        this.setState({filterkyu: event.target.value});
        console.log(this.state.filterkyu)
    };

    filterData = () => {
        this.filterDataReg()
        if (this.state.kyu !== '' || this.state.weight !== '') {
            EnrollStudentService.filterByKyu(this.state.filterkyu)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({unregStudent: response.data})
                            console.log("filter by kyu")
                        } else {
                            alert("No results in unregisterd students")
                        }
                    }
                )
        }
    }

    filterDataReg = () => {
        if (this.state.kyu !== '' || this.state.weight !== '') {
            EnrollStudentService.filterByKyuReg(this.state.filterkyu)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({regStudent: response.data})
                            console.log("filter by kyu Reg")
                        } else {
                            alert("No results in registerd students")
                        }
                    }
                )
        }
    }

    canselFilter = () => {
        this.setState({
            filterkyu: ''
        })
        this.componentDidMount();
    }

    cancelSearch = () => {
        this.setState({
            search: ''
        })
        this.componentDidMount();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Report generation part starting from here
    //Unregister student report
    exportUnregStudPDF = () => {
        console.log("SSSSSSSSSS")


        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "IFKF Unregisterd Student Enrollment Report ";
        const headers = [["Student Id", "Name", "Address", "NIC", "DOB", "Weight", "KYU", "Phone", "E-mail"]];

        const unregStudent = this.state.unregStudent.map(
            std => [
                std.id,
                std.name,
                std.address,
                std.nic,
                moment(std.dob).format('YYYY-MM-DD'),
                std.weight,
                std.kyu,
                std.phone,
                std.email
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: unregStudent
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("IFKFUnregStudentReport.pdf")
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //registerd student report
    exportRegStudPDF = () => {
        console.log("SSSSSSSSSS")


        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "IFKF Registerd Student Enrollment Report ";
        const headers = [["Enrollment Id", "Student Id", "Name", "DOB", "Weight", "KYU"]];

        const regStudent = this.state.regStudent.map(
            std => [
                std.enrollId,
                std.studId,
                std.name,
                moment(std.dob).format('YYYY-MM-DD'),
                std.weight,
                std.kyu
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: regStudent
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("IFKFUnregStudentReport.pdf")
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // buttonValueClicked(btn){
    //     this.setState.btnValue = btn;
    // }

    render() {

        const searchBox = {
            border: "1.5px solid #24a0ed"
        }

        return (
            <div>
                <Container className="my-5" fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Body>
                            <Form.Row>
                                <Card.Header style={{fontSize: '20px'}}>Filter By:</Card.Header>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridKyu">
                                    <Form.Label>Kyu: </Form.Label>
                                    <InputGroup>
                                        <Form.Control as={"select"} autoComplete="off" value={this.state.filterkyu}
                                                      onChange={this.filterChangeKyu} className={"bg-dark text-white"}>
                                            <option value={" "}>---All---</option>
                                            <option value={"10,9,8,7"}>10 09 08 07</option>
                                            <option value={"6,5,4"}>06 05 04</option>
                                            <option value={"3,2,1"}>03 02 01</option>
                                            <option value={"Black"}>Black</option>
                                        </Form.Control>
                                        <InputGroup.Append>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary"
                                                        onClick={() => this.filterData()}><FontAwesomeIcon
                                                    icon={faSearch}/></Button>
                                                <Button size="sm" variant="outline-danger"
                                                        onClick={() => this.canselFilter()}><FontAwesomeIcon
                                                    icon={faTimes}/></Button>
                                            </ButtonGroup>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSearch">
                                    <Form.Label>Search: </Form.Label>
                                    <InputGroup>
                                        <Form.Control style={searchBox} autoComplete="off" placeholder="Search"
                                                      name="search" value={this.state.search}
                                                      className="bg-dark text-white"
                                                      onChange={this.searchChange}/>
                                        <InputGroup.Append>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary" ype="button"
                                                        onClick={this.searchData}><FontAwesomeIcon
                                                    icon={faSearch}/></Button>
                                                <Button size="sm" variant="outline-danger" type="button"
                                                        onClick={this.cancelSearch}><FontAwesomeIcon
                                                    icon={faTimes}/></Button>
                                            </ButtonGroup>
                                        </InputGroup.Append>
                                    </InputGroup>
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


                <Container fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header style={{fontSize: '30px'}}><FontAwesomeIcon icon={faList}/> Current Enrollemnts For
                            This Event</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark" style={{textAlign: "center"}}>
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
                                        std =>
                                            <tr key={std.id}>
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
                                                    <Button size="sm" variant="outline-primary"
                                                            onClick={() => this.updateStudentClicked(std.id)}><FontAwesomeIcon
                                                        icon={faEdit}/></Button> {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                                    <Button size="sm" variant="outline-danger"
                                                            onClick={() => this.deleteStudentsClick(std.id)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>
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
                <Container fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Button style={{textAlign: "center"}} onClick={() => this.props.history.push('/enrollmentform')}>Add
                        New Unregistered Student</Button>
                </Container>
                <br>
                </br>
                <Container fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Button style={{textAlign: "center"}} onClick={() => this.exportUnregStudPDF()}>Unregistered Student
                        Report Download Here</Button>
                </Container>
                <br>
                </br>

                <Container fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header style={{fontSize: '30px'}}><FontAwesomeIcon icon={faList}/> Current Enrolled IFKF
                            Students For This Event</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark" style={{textAlign: "center"}}>
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
                                        regstd =>
                                            <tr key={regstd.enrollId}>
                                                <td>{regstd.enrollId}</td>
                                                <td>{regstd.studId}</td>
                                                <td>{regstd.name}</td>
                                                <td>{moment(regstd.dob).format('YYYY-MM-DD')}</td>
                                                <td>{regstd.weight}</td>
                                                <td>{regstd.kyu}</td>
                                                <ButtonGroup>
                                                    <Button size="sm" variant="outline-danger"
                                                            onClick={() => this.deleteRegStudent(regstd.enrollId)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>
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
                <Container fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Button style={{textAlign: "center"}} onClick={() => this.props.history.push('/RegStudentForm')}>Add
                        New Registered Students</Button>
                </Container>
                <br>
                </br>
                <Container fluid style={{paddingRight: "15%", paddingLeft: "15%"}}>
                    <Button style={{textAlign: "center"}} onClick={() => this.exportRegStudPDF()}>Registered Student
                        Report Download Here</Button>
                </Container>
                <br>
                </br>
                <br>
                </br>
            </div>
        );
    }
}

export default Enrollments;