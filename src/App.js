import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import {routes} from './router';

const App = () => {
    const routeNodes = routes.map((route, index) => {
        return <Route exact={route.exact} component={route.component} path={route.path} key={index} />
    });
    return (
        <div className="App">
            <div className="App__content">
                <Router>
                    <Switch>
                        {routeNodes}
                    </Switch>
                </Router>
            </div>
        </div>
    );
};

export default App;
