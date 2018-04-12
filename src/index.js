import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';

import './assets/css/style.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
        </App>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
