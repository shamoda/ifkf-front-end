import React, {Component} from "react";
import {
    Row,
    Container,
    Table,
    Button,
    Card,
    Form,
    InputGroup,
    Col,
    Alert,
    FormControl, CardDeck
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import SessionService from "../../API/SessionService";
import {
    faList,
    faSearch,
    faTimes,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward
} from "@fortawesome/free-solid-svg-icons";
import "./GetInTouch.css";
import Image from "react-bootstrap/Image";

class GetInTouch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Sessions: [],
            currentPage: 1,
            sessionsPerPage: 5,
            search: '',
            searchMessage: null,
            fMessage: null,
            fErrorMessage: null
        };

    }

    // calling the restAPI
    componentDidMount() {
        this.refreshSession();
    }

//refresh Session
    refreshSession() {
        SessionService.getSessions().then((response) => {
            this.setState({Sessions: response.data});
        });
    }

//.............................................................................

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    cancelSearch = () => {
        this.setState({
            search: '',
            searchMessage: null,
            fMessage: null
        })
        this.refreshSession();
    }

    searchData = () => {

        if (this.state.search !== '') {
            SessionService.searchSession(this.state.search)
                .then(
                    response => {
                        if (response.data.length >= 1) {
                            this.setState({
                                Sessions: response.data,
                                searchMessage: null,
                                fMessage: null

                            })
                        } else {
                            this.setState({searchMessage: "Sorry!! No matching Record Found", fMessage: null})
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
        if (this.state.currentPage < Math.ceil(this.state.Sessions.length / this.state.sessionsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.Sessions.length / this.state.sessionsPerPage)
            });
        }
    };
    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.Sessions.length / this.state.sessionsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };


    render() {
        const {
            search, currentPage, sessionsPerPage, Sessions
        } = this.state;
        //pagination
        const lastIndex = currentPage * sessionsPerPage;
        const firstIndex = lastIndex - sessionsPerPage;
        const currentSessions = Sessions.slice(firstIndex, lastIndex);
        const totalPages = Sessions.length / sessionsPerPage;

        //css for pagetext
        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <Container fluid className={"p-0 mb-5"}>

                <Container fluid className={"contact-container-background p-5 mb-5"}>
                    <div className="row justify-content-sm-center pt-5">
                        <h1 className={"display-4 pt-4"}>Get in touch</h1>
                    </div>
                    <div className="row justify-content-sm-center">
                        <p className={"p-2"}>Want to get in touch? We'd love to hear from you. Here's how you can reach
                            us.</p>
                    </div>
                </Container>

                <Container className={"py-5"}>

                    {/*<h2 className={"py-5"} style={{textAlign:'center'}}>Locations</h2>*/}

                    {/*<div className={"col country-card"}>*/}
                    {/*    <div className={"country-badge"}>*/}
                    {/*        <img src={require(`../../Assets/logo.png`)} className={"contact-badge-img"} />*/}
                    {/*    </div>*/}
                    {/*    <h2>Country</h2>*/}
                    {/*</div>*/}

                    <CardDeck>
                        <Card className={"country-card"}>
                            <div className={"country-badge"}>
                                <Image className={"country-badge-img"} src={require(`../../Assets/japan.jpg`)}
                                       style={{backgroundColor:'#8D8D8D'}} roundedCircle />
                            </div>
                            <Card.Body style={{textAlign:'center', paddingTop:0 }}>
                                <Card.Title>Funao, Japan</Card.Title>
                                <Card.Text className={"text-muted"}>
                                    Funao 2753-4<br/>
                                    Office: +0 906 179 3283
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className={"country-card"}>
                            <div className={"country-badge"}>
                                <Image className={"country-badge-img"} src={require(`../../Assets/sl.jpg`)}
                                       style={{backgroundColor:'#8D8D8D'}} roundedCircle />
                            </div>
                            <Card.Body style={{textAlign:'center', paddingTop:0 }}>
                                <Card.Title>Colombo, Sri lanka</Card.Title>
                                <Card.Text className={"text-muted"}>
                                    Colombo, EC3M 3JY <br/>
                                    Office: +94 112 280 5040
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className={"country-card"}>
                            <div className={"country-badge"}>
                                <Image className={"country-badge-img"} src={require(`../../Assets/india.jpg`)}
                                       style={{backgroundColor:'#8D8D8D'}} roundedCircle />
                            </div>
                            <Card.Body style={{textAlign:'center', paddingTop:0 }}>
                                <Card.Title>Chennai, India</Card.Title>
                                <Card.Text className={"text-muted"}>
                                    SP Infocity, Block B,<br/>
                                    Office: +91 44 6667 8040
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </CardDeck>

                </Container>

                <Container className={"py-5 mt-5"}>

                    {/*<h2 className={"py-5"} style={{textAlign:'center'}}>Sessions</h2>*/}

                    {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                    {this.state.searchMessage && <Alert variant="danger">{this.state.searchMessage}</Alert>}
                    <Card className={"border bg-light"}>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <div style={{float: "left"}}>
                                        <FontAwesomeIcon icon={faList}/> Session Time Table
                                    </div>
                                    <br/>
                                    <br/>
                                </Col>
                                <Col sm={5}>
                                    <div style={{"float": "right"}}>
                                        <InputGroup size="sm">
                                            <Form.Control className="bg-light"
                                                          style={{"border": "1px solid #17A2BB"}} name="search"
                                                          placeholder="Search Instructor Name" autoComplete="off"
                                                          value={search} onChange={this.searchChange}/>
                                            <InputGroup.Append>
                                                <Button size="sm" variant="outline-primary" type="button"
                                                        onClick={this.searchData}><FontAwesomeIcon
                                                    icon={faSearch}/></Button>
                                                <Button size="sm" variant="outline-danger" type="button"
                                                        onClick={this.cancelSearch}><FontAwesomeIcon
                                                    icon={faTimes}/></Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Table
                                bordered
                                striped
                                borderless
                                hover
                                variant="light"
                                style={{textAlign: "center"}}
                            >
                                <thead>
                                <tr>
                                    {/* <th>Session ID</th> */}
                                    <th>Date (MM-DD-YYYY)</th>
                                    <th>Starting Time</th>
                                    <th>Ending Time</th>
                                    <th>Venue</th>
                                    <th>Instructor Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Sessions.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="8">No Sessions Available</td>
                                    </tr> :

                                    currentSessions.map((Session) => (
                                        <tr key={Session.sessionId}>
                                            {/* <td>{Session.sessionId}</td> */}
                                            <td>
                                                {moment(Session.day, "YYYY-MM-DD").format("MM-DD-YYYY")}
                                            </td>
                                            <td>{moment(Session.stime, "HH:mm:ss").format("LT")}</td>
                                            <td>{moment(Session.etime, "HH:mm:ss").format("LT")}</td>
                                            <td>{Session.venue}</td>
                                            <td>{Session.instructorName}</td>
                                        </tr>
                                    ))}


                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{"float": "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float": "right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>

                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward}/> First
                                        </Button>

                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward}/> Prev
                                        </Button>
                                    </InputGroup.Prepend>

                                    <FormControl style={pageNumCss} className={"bg-light"} name="currentPage"
                                                 value={currentPage}
                                                 onChange={this.changePage}/>

                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward}/> Next
                                        </Button>

                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward}/> Last
                                        </Button>

                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer>
                    </Card>

                </Container>


            </Container>
        );
    }
}

export default GetInTouch;
