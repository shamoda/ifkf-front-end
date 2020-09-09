import React, { Component } from "react";
import "./Session.css";
import {
  Row,
  Container,
  Table,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import SessionService from "../../API/SessionService";
import {
  faSave,
  faUndo,
  faList,
  faEdit,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

class SessionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Sessions: [],
    };

    this.addSession = this.addSession.bind(this);
  }

  addSession() {
    this.props.history.push("/AddSession");
  }

  // calling the restAPI
  componentDidMount() {
    SessionService.getSessions().then((response) => {
      this.setState({ Sessions: response.data });
    });
  }

  updateSessionClicked() {}

  render() {
    return (
      <div className="Session-table">
        <h1 className="text-center">Session Time-Table</h1>

        <Container fluid>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <div className="button">
                <Button variant="primary" onClick={this.addSession}>
                  <i class="fas fa-user-plus"></i>
                  Add New Session
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table
                bordered
                hover
                striped
                variant="dark"
                borderless
                hover
                variant="dark"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>Session ID</th>
                    <th>Day</th>
                    <th>Starting Time</th>
                    <th>Ending Time</th>
                    <th>Venue</th>
                    <th>Branch</th>
                    <th>Instructor ID</th>
                    <th>Instructor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.Sessions.map((Session) => (
                    <tr key={Session.sessionId}>
                      <td>{Session.sessionId}</td>
                      <td>
                        {moment(Session.day, "YYYY-MM-DD").format("DD-MM-YYYY")}
                      </td>
                      <td>{moment(Session.stime, "HH:mm:ss").format("LT")}</td>
                      <td>{moment(Session.etime, "HH:mm:ss").format("LT")}</td>
                      <td>{Session.venue}</td>
                      <td>{Session.branch}</td>
                      <td>{Session.instructorId}</td>
                      <td>{Session.instructorName}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            style={{ marginRight: 20 }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ marginRight: 5 }}
                            />
                            Update
                          </Button>
                          {"  "}
                          <Button size="sm" variant="outline-danger">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ marginRight: 5 }}
                            />
                            Edit
                          </Button>{" "}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default SessionList;
