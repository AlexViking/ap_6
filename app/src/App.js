import React, { Component } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};

//Secured route
const SecuredRoute = ({ component: Component, ...rest }) => (
    
  <Route
    {...rest}
    render={props =>
    
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


//
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <div>
          {isLoggedIn() && (
              <>
                <Header /> <Sidebar />
              </>
            )}
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            {isLoggedIn() && <Footer />}
          </div>
        </Switch>
      </Router>
    );
  }
}