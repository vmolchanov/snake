import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import Welcome from './components/Welcome';
import Mode from './components/Mode';
import Game from './components/Game';


const App = () => {
    return (
        <div className="App">
            <div className="App__content">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Welcome} />
                        <Route path="/mode" component={Mode} />
                        <Route path="/game" component={Game} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
};

export default App;
