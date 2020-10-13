import React, { Component } from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup, InputGroup, FormControl ,Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash, faSearch, faTimes, faFilePdf ,faStepBackward,faFastBackward,faStepForward,faFastForward} from '@fortawesome/free-solid-svg-icons'
import StudentService from '../../API/StudentService';
import swal from "sweetalert";

class StudentTableComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            students : [],
            search : "",
            currentPage:1,
            studentsPerPage:10,
            fMessage: null,
            message : null,
            searchMessage:null,
            fErrorMessage: null
           
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
        StudentService.deleteStudent(id).then((response) => {
     
            swal({
              title:"Student Deleted Successfully",
              icon:"warning",
              button:"ok"
            })
      
            this.refreshStudent()
          });
        
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

    //...............................................................
 changePage = event => {
    this.setState({
      [event.target.name]: parseInt(event.target.value) //converting to int
    });
  };

  firstPage = ()=>{
    if(this.state.currentPage > 1){
      this.setState({
        currentPage: 1
      });
    }
  };

  prevPage = () =>{
    if(this.state.currentPage > 1){
      this.setState({
        currentPage:this.state.currentPage -1
      });
    }
  };

  lastPage = ()=>{
    if(this.state.currentPage < Math.ceil(this.state.students.length /this.state.studentsPerPage)){
      this.setState({
        currentPage:Math.ceil(this.state.students.length /this.state.studentsPerPage)
      });
    }
  };
  nextPage = ()=>{
    if(this.state.currentPage < Math.ceil(this.state.students.length /this.state.studentsPerPage)){
      this.setState({
        currentPage:this.state.currentPage + 1
      });
    }
  };

    
    render() {
        const {
            search,currentPage,studentsPerPage,students} = this.state;
            //pagination
          const lastIndex = currentPage * studentsPerPage;
          const firstIndex = lastIndex - studentsPerPage;
          const currentStudents =students.slice(firstIndex,lastIndex);
          const totalPages = students.length / studentsPerPage;
            
          
          const pageNumCss ={
            width: "45px",
            border:"1px solid #17A2B8",
            color:"#17A2B8",
            textAlign:"center",
            fontWeight:"bold"
          };
          
        return (
            <div style ={{marginTop:30,marginRight:40,marginLeft:40}}>
             <Container fluid>
        {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
        {this.state.searchMessage && <Alert variant="danger">{this.state.searchMessage}</Alert>}  
                
               
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
                    {students.length === 0 ?
                  <tr align ="center">
                    <td colSpan ="8">No students Available</td>
                  </tr>:
                
                currentStudents.map((student) => (
                    <tr key={student.studentId}>
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
                                )
                            }
                            
                    </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
              <div style={{"float":"left"}}>
                  Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{"float":"right"}}>
                    <InputGroup size="sm">
                    <InputGroup.Prepend>
                   
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true :false}
                    onClick={this.firstPage}>
                         <FontAwesomeIcon icon={faFastBackward}/> First
                    </Button>
                    
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true :false}
                     onClick={this.prevPage}>
                    <FontAwesomeIcon icon={faStepBackward}/>  Prev
                    </Button>
                    </InputGroup.Prepend>

                    <FormControl style={pageNumCss} className={"bg-light"} name="currentPage" value={currentPage}
                    onChange={this.changePage}/>
                   
                    <InputGroup.Append>
                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true :false}
                     onClick={this.nextPage}>
                    <FontAwesomeIcon icon={faStepForward}/>  Next
                    </Button>
                   
                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true :false}
                     onClick={this.lastPage}>
                    <FontAwesomeIcon icon={faFastForward}/>  Last
                    </Button>
                    
                    </InputGroup.Append>
                    </InputGroup>
              </div>
            </Card.Footer>
            </Card>


            </Container>    
            </div>
        );
    }
}

export default StudentTableComponent;
