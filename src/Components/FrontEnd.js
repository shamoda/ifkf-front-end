import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Header-Footer/Footer";
import Header from "./Header-Footer/Header";
import Login from "./Login/Login";
import Home from "./Home/Home";
import NotFound from "./404NotFound/404NotFound";
import ShopHome from "./SHOP/Views/Home/ShopHome";
import AddEquipment from "./Equipment/AddEquipment";
import SessionList from "./Session/SessionList";
import AddSession from "./Session/AddSession";

class FrontEnd extends Component {
  state = {};

  render() {
    return (
      <div className="FrontEnd">
        <Router>
          <Header />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sessions" component={SessionList} />
            <Route path="/AddSession/:id" component={AddSession} />
            <Route path="/AddSession" component={AddSession} />

            <Route component={NotFound} />
          </Switch>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default FrontEnd;
