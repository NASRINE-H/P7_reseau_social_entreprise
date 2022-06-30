import React from "react";
import {BrowserRouter as Switch, Router, Route, Navigate} from 'react-router-dom';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import Trending from '../../pages/trending';

const index = () => {
    return (
        <Router>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Auth" exact component={Auth}/>
            <Route path="/trending" exact component={Trending}/> 
            <Navigate to="/" />
            </Switch>
        </Router>
    );
};

export default index;