import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import history from './history';
import Booking from './Booking/booking_home';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Booking} />
                </Switch>
            </Router>
        );
    }
}