import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import SaveProposals from './components/SaveProposals';
import Vote from './components/Vote';
import Results from './components/Results';

import{ Router, Switch, Route } from 'react-router-dom';
import history from './history';
import Navigation from './components/Navigation';

ReactDOM.render(
    <Router history={history} >
        <Navigation/>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/SaveProposals' component={SaveProposals} />
            <Route exact path='/Vote' component={Vote} />
            <Route exact path='/Results' component={Results} />
        </Switch>
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
