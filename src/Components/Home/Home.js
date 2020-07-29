import React, { Component } from 'react';
import './Home.css';
import SampleComponents from '../SampleComponents/SampleComponents';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1>Home</h1>
                <SampleComponents />
            </div>
         );
    }
}
 
export default Home;