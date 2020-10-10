import React, { Component } from "react";

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

class sessionListattendance extends Component {
  constructor(props) {
    super(props);

    this.state = {

      Sessions: [],
      id: this.props.match.params.id


    };

    this.addSession = this.addSession.bind(this);
  
    this.viewButtonClicked = this.viewButtonClicked.bind(this);
  }

  addSession() {
    this.props.history.push("/AddSession");
  }

  // calling the restAPI
  componentDidMount() {
    this.refreshSession();
  }



  refreshSession() {
    SessionService.getSessions().then((response) => {
      this.setState({ Sessions: response.data });
    });
  }

    viewButtonClicked(id){

        this.props.history.push(`/attendanceList/${id}`)

}

  render() {
    return (
      <div style={{ padding: "0 50px" }}>
        <h4 className="text-center" style={{marginTop:20}}>Session Time-Table</h4>

        <Container style={{marginTop: 20,width:1000}}>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <Row>
               
                <Col sm={4}>
                  <div>
                  
                  </div>
                </Col>
              </Row>
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
                    <th>Instructor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.Sessions.map((Session) => (
                    <tr key={Session.sessionId}>
                      <td>{Session.sessionId}</td>
    
                      <td>{Session.instructorName}</td>
                      <td>
                        <ButtonGroup>
                          <Button style={{height:35}}
                            onClick={() =>
                              this.viewButtonClicked(Session.sessionId)
                            }
                          >View
                           </Button>
                          
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

export default sessionListattendance;
