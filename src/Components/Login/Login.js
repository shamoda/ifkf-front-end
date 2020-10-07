import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css'
import { Link } from 'react-router-dom';
import AuthenticationService from '../Authentication/AuthenticationService';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]:event.target.value}
        )
    }

    loginClicked() {
        //admin,admin
        if(this.state.userId === 'OP001' && this.state.password === '1'){
            AuthenticationService.successfulLogin(this.state.userId, 'Shamoda', 'Operator')
            this.props.history.push("/")
            this.setState({showSuccessMsg: true})
            this.setState({hasLoginFailed: false})
        }
        if(this.state.userId === 'ST001' && this.state.password === '2'){
            AuthenticationService.successfulLogin(this.state.userId, 'senath', 'Student')
            this.props.history.push("/")
            this.setState({showSuccessMsg: true})
            this.setState({hasLoginFailed: false})
        }
        if(this.state.userId === 'IN001' && this.state.password === '3'){
            AuthenticationService.successfulLogin(this.state.userId, 'minidu', 'Instructor')
            this.props.history.push("/")
            this.setState({showSuccessMsg: true})
            this.setState({hasLoginFailed: false})
        }

        else{
            this.setState({showSuccessMsg: false})
            this.setState({hasLoginFailed: true})
        }












    }

    
    render() {


        return ( 
            <div className="form">
                <Form>
                    <Form.Label style={{fontWeight:"bold", fontSize:30, paddingBottom:20}}>LOGIN</Form.Label>
                    {this.state.hasLoginFailed && <Alert variant="danger">Invalid credentials</Alert>}
                    

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" placeholder="User ID" name="userId" value={this.state.userId} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                        We'll never share your passwords with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remeber me" />
                    </Form.Group>
                    <Button variant="dark" onClick={this.loginClicked} style={{fontWeight:600, fontSize:20}}>
                        Login
                    </Button>
                    <Form.Group>
                        <Link to="forgotpassword" style={{textDecoration:"none"}}><p style={{marginTop:10, color:"red"}}>Forgot password ?</p></Link>
                    </Form.Group>
                </Form>
            </div>
         );
    }
}
 
export default Login;