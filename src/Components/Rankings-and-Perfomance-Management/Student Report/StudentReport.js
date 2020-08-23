import React, { Component } from 'react';

import { Card, Table, Button, Container, Alert } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import RankingsDataService from '../Rankings/RankingsDataService';
import ResultsDataService from '../Results/ResultsDataService';
import AthenticationService from '../../Authentication/AuthenticationService';
import {withRouter} from 'react-router-dom';


class StudentReport extends Component {

    constructor(props){
        super(props);
        this.state = {
            results:[],
            rankings:[],
            studentId: AthenticationService.loggedUserId()
        }

        this.refreshResults = this.refreshResults.bind(this);
        this.refreshRankings = this.refreshRankings.bind(this);
    }

    refreshResults(){
        let studentId = AthenticationService.loggedUserId()
        ResultsDataService.retrieveAllResults(studentId)
            .then(
                response => {
                    this.setState({results : response.data})
                }
            )
    }

    downloadResultsClicked = () => {
        return this.props.history.push('/resultsform/'+this.state.studentId);
    };



    // ================================================================================================================


    refreshRankings(){
        //student id needs to be taken from props
        let studentId = AthenticationService.loggedUserId()
        RankingsDataService.retrieveAllRankings(studentId)
            .then(
                response => {
                    this.setState({rankings : response.data})
                }
            )
    }

    
    downloadRanksClicked = () => {
        return this.props.history.push('/resultsform/'+this.state.studentId);
    };



    componentDidMount() {
        this.refreshResults();
        this.refreshRankings();
    }

    

    render() { 
        return ( 

            <div>
                <div>

                <Container>
                    {/* {this.state.message && <Alert variant="success">{this.state.message}</Alert>} */}
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
                                    </tr>
                                ))
                                }
                            </tbody>
                            </Table>
                        </Card.Body>

                        <Card.Footer style={{"textAlign":"center"}}>
                        {/* <Link to={'/resultsform/'+this.state.studentId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link> */}
                            <Button variant="outline-light" size="sm" type="button" block style={{fontWeight:600, fontSize:17}} onClick={this.downloadResultsClicked.bind()}>
                            <FontAwesomeIcon icon={faFilePdf} /> Download Report
                            </Button>
                        </Card.Footer>

                    </Card>
                </Container>
                <br/>
                </div>


                {/* ====================================================================================================================== */}

                <Container>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faList} /> Rankings Report</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rankings.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="4" >No Ranking Records Available</td>
                                </tr> : 

                                this.state.rankings.map((rank) => (
                                    <tr key={rank.rankingsId}>
                                        <td>{moment(rank.date).format('YYYY-MM-DD')}</td>
                                        <td>{rank.rank}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"center"}}>
                        {/* <Link to={'/resultsform/'+this.state.studentId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link> */}
                            <Button variant="outline-light" size="sm" type="button" block style={{fontWeight:600, fontSize:17}} onClick={this.downloadRanksClicked.bind()}>
                            <FontAwesomeIcon icon={faFilePdf} /> Download Report
                            </Button>
                        </Card.Footer>
                    </Card>
                </Container>


            </div>

         );
    }
}
 
export default withRouter(StudentReport);