import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';

import App from './App';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import rootReducer from './Reducers/index';

import './assets/css/style.css';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
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
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
