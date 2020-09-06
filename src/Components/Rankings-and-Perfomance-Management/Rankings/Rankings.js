import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button, Container, Alert, Col, Form } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faSave, faUndo, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import RankingsDataService from './RankingsDataService';
import AthenticationService from '../../Authentication/AuthenticationService';

class Rankings extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            rankings:[],
            message: null,

            fId:-1,
            fStudentId:'',
            fRank: '',
            fDate : moment(new Date()).format('YYYY-MM-DD'),
            fMessage: null,
            fErrorMessage: null
        }

        this.deleteRankingRecord = this.deleteRankingRecord.bind(this);
        this.updateRankingRecordClicked = this.updateRankingRecordClicked.bind(this);
        this.refreshRankings = this.refreshRankings.bind(this);
        this.submitRankingRecord = this.submitRankingRecord.bind(this);
        this.resetRankingRecord = this.resetRankingRecord.bind(this);

    }

    // initialState = {
    //     fId:'', fStudentId:'', fRank:'', fDate:moment(new Date()).format('YYYY-MM-DD')
    // }

    refreshRankings(){
        //student id needs to be taken from props
        let studentId = AthenticationService.loggedUserId()
        RankingsDataService.retrieveAllRankings(studentId)
            .then(
                response => {
                    this.setState({rankings : response.data})
                    this.setState({fStudentId : studentId})
                }
            )
    }

    componentDidMount() {
        this.refreshRankings();
    }

    // Delete a particular Ranking Record
    deleteRankingRecord(rankingsId){

        RankingsDataService.deleteRankingRecord(rankingsId)
            .then(
                response => {
                    this.setState({message : "Ranking Record Deleted Successfully."})
                    this.refreshRankings()
                    this.setState({fMessage:null, fErrorMessage: null})
                }
            )

    }

    // Load Ranking Data to the Form
    updateRankingRecordClicked(rankingsId){

        RankingsDataService.getRank(rankingsId)
        .then(response => this.setState({
            fId : response.data.rankingsId,
            fStudentId : response.data.studentId,
            fRank : response.data.rank,
            fDate : moment(response.data.date).format('YYYY-MM-DD'),
            fErrorMessage: null,
            fMessage:null
            
        }))
    }

    submitRankingRecord(event){
        event.preventDefault();

        // Form Validations 
        if(this.state.fRank === ''){
            this.setState({fErrorMessage:'Please Select a Rank to Proceed.', fMessage:null})
            return
        }
        if(moment(this.state.fDate).isSameOrBefore(new Date())){
            this.setState({fErrorMessage:'Please Select a Valid Upcoming Date to Proceed.', fMessage:null})
            return
        }


        // Check Whether the Rank is New Rank or Existing Rank
        if (this.state.fId === -1) {

            let rank = {
                // rankingsId: this.state.fId, 
                studentId: this.state.fStudentId, 
                rank: this.state.fRank, 
                date: this.state.fDate 
            };

            RankingsDataService.submitRankingRecord(rank)
                .then(
                    response => {
                        this.setState({fMessage : "Ranking Record Added Successfully."})
                        this.setState({fId:-1, fStudentId:'', fRank:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message:null, fErrorMessage: null})
                        this.refreshRankings()
                    }
                )
        }else{

            let rank = {
                rankingsId: this.state.fId, 
                studentId: this.state.fStudentId, 
                rank: this.state.fRank, 
                date: this.state.fDate 
            };

            RankingsDataService.updateRankingRecord(rank)
                .then(
                    response => {
                        this.setState({fMessage : "Ranking Record Updated Successfully."})
                        this.setState({fId:-1, fStudentId:'', fRank:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message:null, fErrorMessage: null})
                        this.refreshRankings()
                    }
                )
        }
    }

    // Reset Form
    resetRankingRecord(){
        this.setState({fId:-1, fRank:'', fDate:moment(new Date()).format('YYYY-MM-DD'), message: null, fMessage:null, fErrorMessage: null})
    }

    rankChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };


    render() { 

        const {fRank, fDate, fStudentId} = this.state;

        return ( 
            <div>

                <Container>
                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faList} /> Rankings</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Student ID</th>
                                <th>Rank</th>
                                <th>Date</th>
                                <th style={{textAlign:"center"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rankings.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="4" >No Ranking Records Available</td>
                                </tr> : 

                                this.state.rankings.map((rank) => (
                                    <tr key={rank.rankingsId}>
                                        <td>{rank.studentId}</td>
                                        <td>{rank.rank}</td>
                                        <td>{moment(rank.date).format('YYYY-MM-DD')}</td>
                                        <td style={{textAlign:"center"}}>
                                            <ButtonGroup>
                                                {/* <Link to={"edit/"+rank.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link> &nbsp;&nbsp; */}
                                                <Button size="sm" variant="outline-primary" onClick={() => this.updateRankingRecordClicked(rank.rankingsId)}><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;
                                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteRankingRecord(rank.rankingsId)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
                <br/>



{/* ==================================================================================================================================================================== */}


                <Container>
                    {this.state.fMessage && <Alert variant="success">{this.state.fMessage}</Alert>}
                    {this.state.fErrorMessage && <Alert variant="danger">{this.state.fErrorMessage}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.fId !== -1 ? faEdit : faPlusSquare} /> {this.state.fId !== -1 ? "Update Ranking Record" : "Add New Ranking Record"}</Card.Header>
                    <Form onReset={this.resetRankingRecord} onSubmit={this.submitRankingRecord} id="bookFormId" method="post">
                    <Card.Body>
                    
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Studet ID</Form.Label>
                                <Form.Control type="text" name="fStudentId" value={fStudentId} onChange={this.rankChange} required autoComplete="off" placeholder="Enter Student ID" className={"bg-dark text-white"} disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Rank</Form.Label>
                            <Form.Control as="select" name="fRank" value={fRank} onChange={this.rankChange} className={"bg-dark text-white"}>
                                <option value="">-- Select --</option>
                                <option>10th Kyu White Belt</option>
                                <option>09th Kyu Orange Belt</option>
                                <option>08th Kyu Yellow Belt</option>
                                <option>07th Kyu Green Belt</option>
                                <option>06th Kyu Green Belt</option>
                                <option>05th Kyu Green Belt</option>
                                <option>04th Kyu Green Belt</option>
                                <option>03rd Kyu Green Belt</option>
                                <option>02nd Kyu Green Belt</option>
                                <option>01st Kyu Green Belt</option>
                                <option>01st Dan Black Belt</option>
                                <option>02nd Dan Black Belt</option>
                                <option>03rd Dan Black Belt</option>
                                <option>04th Dan Black Belt</option>
                                <option>05th Dan Black Belt</option>
                                <option>06th Dan Black Belt</option>
                                <option>07th Dan Black Belt</option>
                                <option>08th Dan Black Belt</option>
                                <option>09th Dan Black Belt</option>
                                <option>10th Dan Black Belt</option>
                            </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="fDate" value={fDate} onChange={this.rankChange} required className={"bg-dark text-white"} />
                            </Form.Group>

                        </Form.Row>
                        
                    </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {this.state.fId !== -1 ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                    </Card>


                </Container>


            </div>
         );
    }
}
 
export default Rankings;

//need to sort data according to the date