import React, { Component } from 'react';
import './Home.css';
import SampleComponents from '../SampleComponents/SampleComponents';
import Enrollments from '../EventEnrollment/Enrollments';
//import EnrollmentForm from '../EventEnrollment/EnrollmentForm';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1>Home</h1>
                <Enrollments/>
                <SampleComponents />
            </div>
         );
    }
}
 
export default Home;