import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  Col,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import "./Session.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import SessionService from "../../API/SessionService";

class AddSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: -1,
      day: "",
      stime: "",
      etime: "",
      venue: "",
      branch: "",
      instructorName: "",
      instructorId: "",
    };

    this.onSubmitSession = this.onSubmitSession.bind(this);
    this.cancelSession = this.cancelSession.bind(this);
    // this.resetSession = this.resetSession.bind(this);
  }

  componentDidMount() {
    this.refreshSession();
  }

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
          branch: response.data.branch,
          instructorName: response.data.instructorName,
          instructorId: response.data.instructorId,
        });
      });
    }
  }

  onSubmitSession(event) {
    event.preventDefault();

    if (this.state.sessionId === -1) {
      let Session = {
        day: this.state.day,
        stime: this.state.stime,
        etime: this.state.etime,
        venue: this.state.venue,
        branch: this.state.branch,
        instructorId: this.state.instructorId,
        instructorName: this.state.instructorName,
      };

      SessionService.addSession(Session).then((response) => {
        this.props.history.push("/sessions");
      });
    } else {
      let Session = {
        sessionId: this.state.sessionId,
        day: this.state.day,
        stime: this.state.stime,
        etime: this.state.etime,
        venue: this.state.venue,
        branch: this.state.branch,
        instructorId: this.state.instructorId,
        instructorName: this.state.instructorName,
      };

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

  cancelSession() {
    this.props.history.push("/sessions");
  }

  render() {
    const {
      day,
      stime,
      etime,
      venue,
      branch,
      instructorId,
      instructorName,
    } = this.state;

    return (
      <Container fluid style={{ padding: "50px 50px" }}>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>Add New Session Form</Card.Header>
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

              <Form.Row>
                <Form.Group as={Col} controlId="venue">
                  <Form.Label>Venue :</Form.Label>
                  <Form.Control
                    as="select"
                    value={venue}
                    name="venue"
                    onChange={this.SessionChange}
                    required
                  >
                    <option value={"No venue"}>Choose a Venue</option>
                    <option value={"Kalyani Institiute"}>
                      Kalyani Institiute
                    </option>
                    <option value={"ADS Institute"}>ADS Institute</option>
                    <option value={"Main Hall"}>Main Hall</option>
                    <option value={"Karate Institute"}>Karate Institute</option>
                    <option value={"Institite of Dojo"}>
                      Institite of Dojo
                    </option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="branch">
                  <Form.Label>Branch:</Form.Label>
                  <Form.Control
                    as="select"
                    value={branch}
                    name="branch"
                    onChange={this.SessionChange}
                    required
                  >
                    <option value={"No Branch"}>Select the branch</option>
                    <option value={"Colombo"}>Colombo</option>
                    <option value={"Gampaha"}>Gampaha</option>
                    <option value={"Piliyandala"}>Piliyandala</option>
                    <option value={"Maharagama"}>Maharagama</option>
                    <option value={"Kandy"}>Kandy</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="instructorID">
                  <Form.Label>Instructor ID :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Instructor ID"
                    name="instructorId"
                    value={instructorId}
                    onChange={this.SessionChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="instructorName">
                  <Form.Label>Instructor Name :</Form.Label>
                  <Form.Control
                    type="instructorName"
                    placeholder="Enter Instructor Name"
                    name="instructorName"
                    value={instructorName}
                    onChange={this.SessionChange}
                    required
                  />
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
              <Button type="cancel" size="sm">
                <FontAwesomeIcon icon={faUndo} onClick={this.cancelSession} />{" "}
                cancel
              </Button>
              {"  "}
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default AddSession;
