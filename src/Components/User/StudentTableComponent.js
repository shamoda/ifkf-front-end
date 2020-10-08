import React, { Component } from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import StudentService from '../../API/StudentService';


class StudentTableComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            students : [],
            search : ""
        }
        this.addStudent = this.addStudent.bind(this)
        this.refreshStudent = this.refreshStudent.bind(this)
        this.deleteStudentClicked = this.deleteStudentClicked.bind(this)
    }

    addStudent(){
        this.props.history.push(`/addUser/`);
    }

    componentDidMount(){
        this.refreshStudent();
    }

    refreshStudent(){
        StudentService.getStudents().then((res) => {
            this.setState({students:res.data});
        });
    }

    UpdateStudentClicked(id){
        this.props.history.push(`/addStudent/${id}`)
    }

    

    deleteStudentClicked(id){
        StudentService.deleteStudent(id)
        .then(() => this.refreshStudent())
    }

    searchChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };
    
    cancelSearch =() => {
        this.setState({"search" : ''});
    };


    
    render() {
        const {search} = this.state;
        return (
            <div className="container ">
               
                
               
                 <Card className={"border border-dark "}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={faList} />Student List
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name ="search" value={search} 
                            classNamen = {"info-border bg-dark text-white "}
                            onChange={this.searchChange}/>

                            <InputGroup.Append>
                                <Button size="sm" variant = "outline-info" type = "button">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                                <Button size="sm" variant = "outline-danger" type = "button" onClick={this.cancelSearch}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </InputGroup.Append>
                            
                        </InputGroup>
                    </div>

                </Card.Header>
                <Card.Body>
                <div className = "button-margin">
                    <Button variant="primary" type="submit" onClick ={this.addStudent}>
                    Add Student
                </Button>

                
                </div>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>StudentID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Session</th>
                        <th>Contact Number</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                this.state.students.map(
                                    student =>
                                    <tr key = {student.studentId}>
                                        <td>{student.studentId}</td>
                                        <td>{student.name}</td>
                                        <td>{student.address}</td>
                                        <td>{student.email}</td>
                                        <td>{student.session}</td>
                                        <td>{student.phoneNo}</td>
                                        <td>
                                    <ButtonGroup>
                                
                                        <Button size="sm" variant="primary" style ={{marginRight:20}} onClick ={() => this.UpdateStudentClicked(student.studentId)}><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button size="sm" variant="outline-danger" onClick ={() => this.deleteStudentClicked(student.studentId)}><FontAwesomeIcon icon={faTrash} /></Button>

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

export default StudentTableComponent;
