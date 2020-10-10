import React, { Component } from "react";
import {Form,Button,Container,Col,Card,ButtonGroup,Alert} from "react-bootstrap";
import "./Session.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo,faList } from "@fortawesome/free-solid-svg-icons";
import SessionService from "../../API/SessionService";
import moment from "moment";
import swal from 'sweetalert';
import StudentService from "../../API/StudentService";
import InstructorService from "../../API/InstructorService";

class AddSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: -1,
      day: "",
      stime: "",
      etime: "",
      venue: "",
      instructorName: [],
      instructorId:[],
      optionList:[],
      optionList1:[],
      fMessage: null,
      fErrorMessage: null,
      message: null,

    };

    this.onSubmitSession = this.onSubmitSession.bind(this);
    this.List = this.List.bind(this);
    // this.resetSession = this.resetSession.bind(this);
  }

  componentDidMount() {
    this.refreshSession();

  
    InstructorService.getInstructors()
            .then(
                response => {
                    
                    this.setState({optionList:response.data.map(code =>
                        <option id="code.instructorId">
                            {code.instructorId}
                        </option>

                    )})

                    this.setState({optionList1:response.data.map(code =>
                      <option id="code.name">
                          {code.name}
                      </option>
                  )})
                }
            )
            
  }

  //refresh the sesssion table
  refreshSession() {
    const getId = this.props.match.params.id;
    if (getId != null) {
      SessionService.retrieveSession(getId).then((response) => {
        this.setState({
          sessionId: response.data.sessionId,
          day: response.data.day,
          stime: response.data.stime, 
          etime: response.data.etime,
          venue: response.data.venue,
          instructorName: response.data.instructorName,
          instructorId: response.data.instructorId,
        });
      });
    }
  }

//adding a new session
  onSubmitSession(event) {
    event.preventDefault();

    //validate date
    if(moment(this.state.day).isSameOrBefore(new Date())){
      this.setState({fErrorMessage:'Please select a valid Date', fMessage:null})
      return
  }
   //checking if the form has data
    if (this.state.sessionId === -1) {
      let Session = {
        day: this.state.day,
        stime: this.state.stime,
        etime: this.state.etime,
        venue: this.state.venue,
        instructorId: this.state.instructorId,
        instructorName: this.state.instructorName,
      };
      
      swal({
        title:"New Session Added",
        icon:"success",
        button:"ok",
      })   

      SessionService.addSession(Session).then((response) => {
        this.props.history.push("/sessions");
      });
    }
     else { //update session
      let Session = {
        sessionId: this.state.sessionId,
        day: this.state.day,
        stime: this.state.stime,
        etime: this.state.etime,
        venue: this.state.venue,
        instructorId: this.state.instructorId,
        instructorName: this.state.instructorName,
      };

      swal({
        title:"Session Updated",
        icon:"success",
        button:"ok"
      })

      SessionService.updateSession(Session).then((response) => {
        this.props.history.push("/sessions");
      });
    }
  }

  SessionChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  List() {
    this.props.history.push("/sessions");
  }

  //Demo button 
  demoClicked(){
    this.setState({
        day: '2020-10-19',
        stime:'13:00:00',
        etime:'15:30:00',
        venue:'Kalyani Institiute - Gampaha',
        instructorId:'IN005',
        instructorName:'Amal Ferando'
    })
  }

  render() {
    const {
      day,
      stime,
      etime,
      venue,
      instructorId,
      instructorName,
    } = this.state;

    return (
      <Container fluid style={{ padding: "50px 50px" }}>
        {this.state.fMessage && <Alert variant="success">{this.state.fMessage}</Alert>}
        {this.state.fErrorMessage && <Alert variant="danger">{this.state.fErrorMessage}</Alert>}
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header><i class="fas fa-user-plus"></i>Add New Session Form</Card.Header>
          <Form onSubmit={this.onSubmitSession} id="FormId" method="post">
            <Card.Body>

              <Form.Group controlId="day">
                <Form.Label>Session Day :</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter the Session date"
                  name="day"
                  value={day}
                  onChange={this.SessionChange}
                  required
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="stime">
                  <Form.Label>Session Start Time :</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="Starting time"
                    name="stime"
                    value={stime}
                    onChange={this.SessionChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="etime">
                  <Form.Label>Session End Time :</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="Ending time"
                    name="etime"
                    value={etime}
                    onChange={this.SessionChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

                <Form.Group  controlId="venue">
                  <Form.Label>Venue :</Form.Label>
                  <Form.Control
                    as="select"
                    value={venue}
                    name="venue"
                    onChange={this.SessionChange}
                    required
                  >
                    <option value={"No venue"}>Choose a Venue</option>
                    <option value={"Kalyani Institiute - Gampaha"}>
                      Kalyani Institiute - Gampaha
                    </option>
                    <option value={"ADS Institute - Kandy"}>ADS Institute - Kandy</option>
                    <option value={"Main Hall - Maradana"}>Main Hall - Maradana</option>
                    <option value={"Karate Institute - Nugegoda"}>Karate Institute - Nugegoda</option>
                    <option value={"Institite of Dojo - Colombo"}>
                      Institite of Dojo - Colombo
                    </option>
                    <option value={"Institite of Karate - Colombo"}>
                    Institite of Karate - Colombo
                    </option>
                  </Form.Control>
                </Form.Group>
              


              <Form.Row>
                <Form.Group as={Col} controlId="instructorID">
                  <Form.Label>Instructor ID :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Instructor ID"
                    name="instructorId"
                    as="select" 
                    value={instructorId}
                    onChange={this.SessionChange}                   
                    required
                    autoComplete="off"
                  > {this.state.optionList}</Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="instructorName">
                  <Form.Label>Instructor Name :</Form.Label>
                  <Form.Control
                    type="instructorName"
                    placeholder="Enter Instructor Name"
                    name="instructorName"
                    as="select" 
                    value={instructorName}
                    onChange={this.SessionChange}
                    required
                    autoComplete="off"
                  >{this.state.optionList1}</Form.Control>
                </Form.Group>
              </Form.Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Save
              </Button>
              {"  "}
              <Button type="reset" size="sm">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
              {"  "}
              <Button size="sm"  onClick={this.List}>
                <FontAwesomeIcon icon={faList}  />{" "}
                Back to List
              </Button>
              {"  "}
              <Button size="sm" style={{textAlign:"center"}} 
              onClick={() => this.demoClicked()}>Demo</Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>

    );
  }
}

export default AddSession;