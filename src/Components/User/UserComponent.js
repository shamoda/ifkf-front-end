import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Card, Form, Col,Row, Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

class UserComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
           
        }
        this.addStudent = this.addStudent.bind(this)
        this.addInstructor =this.addInstructor.bind(this)
        
    }

    addStudent(){
        this.props.history.push(`/students`);
    }

    addInstructor(){
        this.props.history.push('/instructors')
    }
    render() {
        return (

            
            <div className="container" >
                 <Card className={"border border-dark "} style={{marginTop:100}}s>
                    <Card.Header><FontAwesomeIcon icon={faEdit} />  USERS</Card.Header>
                    
                    <Card.Body>
                <Button variant="secondary" size="lg" block onClick={this.addStudent}> STUDENTS</Button>
                <br/>
                <br/>
                
                <Button variant="secondary" size="lg" block onClick={this.addInstructor}>INSTRUCTORS</Button>
                </Card.Body>
            </Card>
        </div>
        );
    }
}

export default UserComponent;
