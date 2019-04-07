import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import Welcome from './components/Welcome';
import Mode from './components/Mode';
import Game from './components/Game';

class App extends Component {
    render() {
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
    }
}

export default App;
