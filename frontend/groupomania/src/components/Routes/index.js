import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import trending from '../../pages/trending';

const index = () => {
    return (
        <Router>
            <switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Auth" exact component={Auth}/>
            <Route path="/trending" exact component={trending}/> 
            <Redirect to="/" />
                

            </switch>

        </Router>
    );
};

export default index;