import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import ResultsForm from './Rankings-and-Perfomance-Management/Results/ResultsForm';
import NotFound from './404NotFound/404NotFound';
import Results from './Rankings-and-Perfomance-Management/Results/Results';
import StudentList from './Rankings-and-Perfomance-Management/Student List/StudentList';
import StudentReport from './Rankings-and-Perfomance-Management/Student Report/StudentReport';
import Rankings from './Rankings-and-Perfomance-Management/Rankings/Rankings';
import GradingExaminations from './Rankings-and-Perfomance-Management/Grading Examinations/GradingExaminations';


class FrontEnd extends Component {

    state = {  }

    render() { 

        return ( 

            <div className="FrontEnd">

                <Router>

                    <Header />

                    <Switch>

                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/studentperformance" component={StudentList} />
                        <Route path="/performance/:studentId" component={Results} />
                        <Route path="/ranking/:studentId" component={Rankings} />
                        <Route path="/myperformance" component={StudentReport} />
                        <Route path="/exams" component={GradingExaminations} />
                        <Route path="/resultsform/:id" component={ResultsForm} />
                        <Route path="/results/:studentId" component={Results} />


                        <Route component={NotFound} />

                    </Switch>

                    <Footer />

                </Router>

            </div>

         );
    }
}
 
export default FrontEnd;