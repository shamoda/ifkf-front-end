import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EquipmentDataService from '../../API/EquipmentDataService'
import { faList, faSearch, faEdit, faTimes, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';

class ShowDonations extends Component {
    constructor(props) {
        super(props);
        this.state = {


            id: '',
            date: moment(new Date()).format('YYYY-MM-DD'),
            quantity: '',
            sessionID: '',
            equipmentID: '',


            donations: [],
            currentPage: 1,
            donationsPerPage: 4,
            search: '',
            searchMessage: null
        }

        this.refreshDonations = this.refreshDonations.bind(this);
        this.deleteDonationClicked = this.deleteDonationClicked.bind(this);
        this.retrieveDonations = this.retrieveDonations.bind(this);

    }


    componentDidMount() {

        this.refreshDonations();

    }

    refreshDonations() {

        EquipmentDataService.retrieveAllDonations()
            .then(

                response => {

                    this.setState({ donations: response.data })
                }

            )


    }

    deleteDonationClicked(id) {


        EquipmentDataService.deleteDonation(id)
            .then(
                response => {

                    this.setState({ message: `Delete of Donation ${id} Successful` });
                    this.refreshDonations();
                }

            )
    }

    retrieveDonations(id) {



        EquipmentDataService.retrieveDonation(id)

            .then(response => this.setState({
                id: response.data.donateID,
                date: moment(response.data.donateDate).format('YYYY-MM-DD'),
                quantity: response.data.quantity,
                sessionID: response.data.equipment.id,
                equipmentID: response.data.sessions.id

            }))

    }




    changePage = event => {

        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        let donationsLength = this.state.donations.length;
        if (this.state.currentPage < Math.ceil(donationsLength / this.state.donationsPerPage)) {
            this.setState({
                currentPage: Math.ceil(donationsLength / this.state.donationsPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.donations.length / this.state.donationsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    searchData = () => {

        if (this.state.search !== '') {
            EquipmentDataService.searchDonation(this.state.search)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({
                                donations: response.data,
                                searchMessage: null,
                                fMessage: null
                            })
                        }
                        else {
                            this.setState({
                                searchMessage: "No Matching Record Found",
                                fMessage: null
                            })
                        }
                    }
                )
        }
    }

    cancelSearch = () => {
        this.setState({
            search: '',
            searchMessage: null,
            fMessage: null
        })
        this.refreshDonations();
    }

    render() {


        const searchBox = {
            border: "1.5px solid #24a0ed"
        }




        const { donations, currentPage, donationsPerPage, search } = this.state;
        const lastIndex = currentPage * donationsPerPage;
        const firstIndex = lastIndex - donationsPerPage;
        const currentDonations = donations.slice(firstIndex, lastIndex);
        const totalPages = donations.length / donationsPerPage;

        const pageNumCss = {

            width: "45px",
            border: "1px solid #17A288",
            color: "#17A288",
            textAlign: "center",
            fontWeight: "bold"


        };




        return (

            <div>
                <div style={{ marginLeft: 100, fontFamily: "Brush Script MT", fontSize: 64 }}>
                    Donations
              </div>
                <Button variant="secondary" style={{ marginLeft: 500, marginTop: 10, marginBottom: 20, width: 500, color: "black" }} ><a href="/requests" style={{ color: "black", textDecoration: 'none' }}>Request</a> </Button>{' '}

                <br />




                <Container>

                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faList} /> List
                           <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                    <FormControl style={searchBox} autoComplete="off" placeholder="Search" name="search" value={search} className="bg-dark text-white" onChange={this.searchChange} />&nbsp;
                                    <InputGroup.Append>
                                        <Button size="sm" variant="outline-primary" type="button" onClick={this.searchData}><FontAwesomeIcon icon={faSearch} /></Button>&nbsp;
                                       <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}><FontAwesomeIcon icon={faTimes} /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>


                        </Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark" style={{ textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th>Donation ID</th>
                                        <th>Date</th>
                                        <th>Quantity</th>
                                        <th>Equipment</th>
                                        <th>Session ID</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.length === 0 ?

                                        <tr align="center">
                                            <td colSpan="6">No users Available</td>

                                        </tr> :
                                        currentDonations.map((donations) => (
                                            <tr key={donations.donateID} align="center">
                                                <td>{donations.donateID}</td>
                                                <td>{moment(donations.donateDate).format('YYYY-MM-DD')}</td>
                                                <td>{donations.quantity}</td>
                                                <td>{donations.equipment.type}</td>
                                                <td>{donations.sessions.sessionId}</td>


                                            </tr>
                                        ))

                                    }



                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>


                            <div style={{ "float": "left" }}>
                                Showing Page {currentPage} of{Math.ceil(totalPages)}

                            </div>
                            <div style={{ "float": "right" }}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage} >
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button >

                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage} >
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>

                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage} disabled
                                        onChange={this.changePage}
                                    />
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} />   Next
                                         </Button>

                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} />  Last
                                       </Button>

                                    </InputGroup.Append>

                                </InputGroup>

                            </div>




                        </Card.Footer>
                    </Card>

                </Container>


                <br />
                <br />
                <br />
                <br />

            </div>
        );
    }
}

export default withRouter(ShowDonations);
