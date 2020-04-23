import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import history from './history';
import Booking from './Booking/booking_home';
import Register from './Registration/register'
import Login from './SignIn/user_login';
import AirlineLogin from './SignIn/airline_login';
import LoggedIn from './SignIn/loggedin';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/booking" exact component={Booking} />
                    <Route path="/" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/loggedin" exact component={LoggedIn} />
                    <Route path="/airlinelogin" exact component={AirlineLogin} />
                </Switch>
            </Router>
        );
    }
}