import React, { Component } from 'react';
import ResultsDataService from './ResultsDataService';
import { Card, Table, ButtonGroup, Button, Container, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import {Link} from 'react-router-dom';
import { withRouter} from 'react-router-dom';


class Results extends Component {

    constructor(props){
        super(props);
        this.state = {
            results:[],
            studentId:'',
            message: null,
            updateClicked: null
        }

        this.deleteResultRecord = this.deleteResultRecord.bind(this);
        this.refreshResults = this.refreshResults.bind(this);
    }

    refreshResults(){
        //student id needs to be taken from props
        const studentId = this.props.match.params.studentId;
        ResultsDataService.retrieveAllResults(studentId)
            .then(
                response => {
                    this.setState({results : response.data})
                    this.setState({studentId : studentId})
                }
            )
    }

    componentDidMount() {
        this.refreshResults();
    }


    deleteResultRecord(resultsId){

        ResultsDataService.deleteResultRecord(resultsId)
            .then(
                response => {
                    this.setState({message : "Result Record Deleted Successfully."})
                    this.refreshResults()
                }
            )
    }

    enterResultsClicked = () => {
        return this.props.history.push('/resultsform/'+this.state.studentId);
    };



    render() { 

        return ( 

            <div>
                <br></br>
                <br></br>
                <br></br>

                <Container>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faList} /> Performance Report</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark" style={{textAlign:"center"}}>
                            <thead>
                                <tr>
                                <th>Exam Code</th>
                                <th>Date</th>
                                <th>Kihon</th>
                                <th>Combinations</th>
                                <th>Kata</th>
                                <th>Kumite</th>
                                <th>General Knowledge</th>
                                <th>Theory</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.results.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="9" >No Performance Records Available</td>
                                </tr> :

                                this.state.results.map((result) => (
                                    <tr key={result.resultsId}>
                                        <td>{result.examCode}</td>
                                        <td>{moment(result.date).format('YYYY-MM-DD')}</td>
                                        <td>{result.kihon}</td>
                                        <td>{result.combinations}</td>
                                        <td>{result.kata}</td>
                                        <td>{result.kumite}</td>
                                        <td>{result.generalKnowledge}</td>
                                        <td>{result.theory}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/resultsform/"+result.resultsId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link> &nbsp;&nbsp;
                                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteResultRecord(result.resultsId)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                            </Table>
                        </Card.Body>

                        <Card.Footer style={{"textAlign":"center"}}>
                        {/* <Link to={'/resultsform/'+this.state.studentId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link> */}
                            <Button variant="primary" size="sm" type="button" block style={{fontWeight:600, fontSize:17}} onClick={this.enterResultsClicked.bind()}>
                            <FontAwesomeIcon icon={faEdit} /> Enter Results
                            </Button>
                        </Card.Footer>

                    </Card>
                </Container>
                <br></br>
                <br></br>
            </div>
         );
    }

}
 
export default withRouter(Results);