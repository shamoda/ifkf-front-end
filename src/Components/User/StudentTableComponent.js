import React, { Component } from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash, faSearch, faTimes, faFilePdf} from '@fortawesome/free-solid-svg-icons'
import StudentService from '../../API/StudentService';


class StudentTableComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            students : [],
            search : "",
            fMessage: null,
            message : null,
           
        }
        this.addStudent = this.addStudent.bind(this)
        this.refreshStudent = this.refreshStudent.bind(this)
        this.deleteStudentClicked = this.deleteStudentClicked.bind(this)
    }

    addStudent(){
        this.props.history.push(`/addUser/student`);
    }

    componentDidMount(){
        this.refreshStudent();
    }

    generateStudentReportClicked(searchText){
        StudentService.downloadStudentReport(searchText)
            .then(
                response => {
                    this.setState({message : response.data, fMessage:''});
                }
            )
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

    searchChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
    
      cancelSearch =() =>{
        this.setState({
         search:'',
         searchMessage:null,
         fMessage:null
      })
       this.refreshStudent();
    }
    
    searchData =() =>{
    
      if(this.state.search !==''){
        StudentService.searchStudent(this.state.search)
        .then(
          response =>{
            if(response.data.length >= 1){
              this.setState({students :response.data
                
              })
            }
            else{
              this.setState({searchMessage:"No matching Record Found", fMessage:null})
            }
          }
        )
      }
    }


    
    render() {
        const {search} = this.state;
        return (
            <div className="container " style ={{marginTop:30}}>
               
                
               
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
                                <Button size="sm" variant = "outline-info" type = "button"  onClick={this.searchData}>
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
                                        <td>{student.sessionId}</td>
                                        <td>{student.phoneNo}</td>
                                        <td>
                                    <ButtonGroup>
                                        <Button size="sm" variant="outline-light" style ={{marginRight:20}} onClick={() => this.generateStudentReportClicked(student.sessionId)}><FontAwesomeIcon icon={faFilePdf} /></Button> 
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
