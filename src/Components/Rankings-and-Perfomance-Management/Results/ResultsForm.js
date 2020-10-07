import React, { Component } from 'react';

import { Card, Button, Container, Alert, Col, Form } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faSave, faUndo, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import ResultsDataService from './ResultsDataService';
import GradingExaminationsDataService from '../Grading Examinations/GradingExaminationsDataService'
import {withRouter} from 'react-router-dom';

class ResultsForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            resultsId:-1, 
            studentId:this.props.match.params.id, 
            examCode:[], 
            date:moment(new Date()).format('YYYY-MM-DD'), 
            kihon:'', 
            combinations:'', 
            kata:'', 
            kumite:'', 
            generalKnowledge:'', 
            theory:'',
            optionList:[]

        }

        this.submitResultRecord = this.submitResultRecord.bind(this);
        this.resetResultRecord = this.resetResultRecord.bind(this);

        
    }

    
    componentDidMount() {
        const resultsId = +this.props.match.params.id;

        if(resultsId % 1 === 0){
            ResultsDataService.getResult(resultsId)
            .then(response => this.setState({
                resultsId : response.data.resultsId,
                studentId : response.data.studentId,
                examCode : response.data.examCode,
                date : moment(response.data.date).format('YYYY-MM-DD'),
                kihon : response.data.kihon,
                combinations : response.data.combinations,
                kata : response.data.kata,
                kumite : response.data.kumite,
                generalKnowledge : response.data.generalKnowledge,
                theory : response.data.theory
                // updateClicked : 200,          STOPPED RIGHT HERE
                // disabled: true
            })) 
        }

        GradingExaminationsDataService.retrieveAllExams()
            .then(
                response => {
                    
                    this.setState({optionList:response.data.map(code =>
                        <option id="code.examCode">
                            {code.examCode}
                        </option>
                    )})
                }
            )

            

        

    }

    

    submitResultRecord(event){
        event.preventDefault();

        //Form Validations
        if(this.state.examCode === ''){
            this.setState({fErrorMessage:'Please Select a Exam Code to Proceed.', fMessage:null})
            return
        }
        if(moment(this.state.date).isSameOrBefore(new Date())){
            this.setState({fErrorMessage:'Please Select a Valid Upcoming Date to Proceed.', fMessage:null})
            return
        }
        if(parseInt(this.state.kihon, 10) > 20){
            this.setState({fErrorMessage:'Please enter Kihon marks out of 20', fMessage:null})
            return
        }
        if(parseInt(this.state.combinations, 10) > 20){
            this.setState({fErrorMessage:'Please enter Combinations marks out of 20', fMessage:null})
            return
        }
        if(parseInt(this.state.kata, 10) > 20){
            this.setState({fErrorMessage:'Please enter Kata marks out of 20', fMessage:null})
            return
        }
        if(parseInt(this.state.kumite, 10) > 20){
            this.setState({fErrorMessage:'Please enter Kumite marks out of 20', fMessage:null})
            return
        }
        if(parseInt(this.state.generalKnowledge, 10) > 50){
            this.setState({fErrorMessage:'Please enter General Knowledge marks out of 50', fMessage:null})
            return
        }
        if(parseInt(this.state.theory, 10) > 50){
            this.setState({fErrorMessage:'Please enter Theory marks out of 50', fMessage:null})
            return
        }
        


        if (this.state.resultsId === -1) {

            let result = {
                // rankingsId: this.state.fId, 
                studentId: this.state.studentId, 
                examCode: this.state.examCode,
                date: this.state.date,
                kihon: this.state.kihon,
                combinations: this.state.combinations,
                kata: this.state.kata,
                kumite: this.state.kumite,
                generalKnowledge: this.state.generalKnowledge,
                theory: this.state.theory
            };

            ResultsDataService.submitResultRecord(result)
                .then(
                    response => {
                        setTimeout(() => {
                            this.props.history.push('/studentperformance')
                        }, 2000)
                        this.setState({fMessage : "Result Record Added Successfully."})
                        this.setState({studentId:'', examCode:'', date:moment(new Date()).format('YYYY-MM-DD'), kihon:'', combinations:'', kata:'', kumite:'', generalKnowledge:'', theory:'', fErrorMessage:null})
                    }
                )
        }else{

            let result = {
                // rankingsId: this.state.fId,
                resultsId: this.state.resultsId, 
                studentId: this.state.studentId, 
                examCode: this.state.examCode,
                date: this.state.date,
                kihon: this.state.kihon,
                combinations: this.state.combinations,
                kata: this.state.kata,
                kumite: this.state.kumite,
                generalKnowledge: this.state.generalKnowledge,
                theory: this.state.theory
            };

            ResultsDataService.updateResultRecord(result)
                .then(
                    response => {
                        setTimeout(() => {
                            this.props.history.push('/studentperformance')
                        }, 2000)
                        this.setState({fMessage : "Result Record Updated Successfully."})
                        this.setState({studentId:'', examCode:'', date:moment(new Date()).format('YYYY-MM-DD'), kihon:'', combinations:'', kata:'', kumite:'', generalKnowledge:'', theory:'', fErrorMessage:null})
                    }
                )
        }
    }

    // resultsList = () => {
    //     return this.props.history.push("/results/"+this.state.studentId);
    // };


    resetResultRecord(){
        this.setState({ examCode:'', date:moment(new Date()).format('YYYY-MM-DD'), kihon:'', combinations:'', kata:'', kumite:'', generalKnowledge:'', theory:''})
    }


    resultChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };



    render() { 

        const { examCode, date, kihon, combinations, kata, kumite, generalKnowledge, theory} = this.state

        

        return ( 

            <div>
            <br></br>
            <br></br>
                <Container>
                    {this.state.fMessage && <Alert variant="success">{this.state.fMessage}</Alert>}
                    {this.state.fErrorMessage && <Alert variant="danger">{this.state.fErrorMessage}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.resultsId !== -1 ? faEdit : faPlusSquare} /> {this.state.resultsId !== -1 ? "Update Result Record" : "Add New Result Record"}</Card.Header>
                    <Form onReset={this.resetResultRecord} onSubmit={this.submitResultRecord} id="bookFormId" method="post">
                    <Card.Body>
                    
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Exam Code</Form.Label>
                                <Form.Control as="select" name="examCode" value={examCode} onChange={this.resultChange} required className={"bg-dark text-white"}>
                                    {this.state.optionList}
                                </Form.Control>
                                {/* <Form.Control type="text" name="examCode" value={examCode} onChange={this.resultChange} required autoComplete="off" placeholder="Exam Code" className={"bg-dark text-white"} /> */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAuthor">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" value={date} onChange={this.resultChange} required className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Kihon</Form.Label>
                                <Form.Control type="text" name="kihon" value={kihon} onChange={this.resultChange} required autoComplete="off" placeholder="Enter marks out of 20" className={"bg-dark text-white"} disabled={this.state.disabled} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Combinations</Form.Label>
                                <Form.Control type="text" name="combinations" value={combinations} onChange={this.resultChange} required autoComplete="off" placeholder="Enter marks out of 20" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Kata</Form.Label>
                                <Form.Control type="text" name="kata" value={kata} onChange={this.resultChange} required autoComplete="off" placeholder="Enter marks out of 20" className={"bg-dark text-white"} disabled={this.state.disabled} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Kumite</Form.Label>
                                <Form.Control type="text" name="kumite" value={kumite} onChange={this.resultChange} required autoComplete="off" placeholder="Enter marks out of 20" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>General Knowledge</Form.Label>
                                <Form.Control type="text" name="generalKnowledge" value={generalKnowledge} onChange={this.resultChange} required autoComplete="off" placeholder="Enter marks out of 50" className={"bg-dark text-white"} disabled={this.state.disabled} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Theory</Form.Label>
                                <Form.Control type="text" name="theory" value={theory} onChange={this.resultChange} required autoComplete="off" placeholder="Enter marks out of 50" className={"bg-dark text-white"} />
                            </Form.Group>
                        </Form.Row>
                        
                    </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {this.state.resultsId !== -1 ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                            {/* <Button variant="primary" size="sm" type="button" onClick={this.resultsList.bind()}>
                            <FontAwesomeIcon icon={faSave} /> Results
                            </Button> */}
                        </Card.Footer>
                    </Form>
                    </Card>
                </Container>
                <br></br>
            <br></br>
            </div>
            


         );
    }
}
 
export default withRouter(ResultsForm);