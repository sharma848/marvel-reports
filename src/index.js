import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';

import App from './App';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
// import Home from './Components/Home/Home';
import rootReducer from './Reducers/index';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css';
import registerServiceWorker from './registerServiceWorker';
import UserDetails from './Components/UserDetail/UserDetails';
import Account from './Components/Account/Account';
import SelectCharts from './Components/Charts/SelectCharts';
import ConfigPage from './Components/ConfigPage/ConfigPage';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Login} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={SignUp} />
				<Dashboard>
					<Route path="/dashboard/userAccess" exact component={UserDetails} />
					<Route path="/dashboard/settings" exact render={() => <h3>Settings page</h3>} />
					<Route path="/dashboard/account" exact component={Account} />
					<Route path="/dashboard/chart" exact component={SelectCharts} />
					<Route path="/dashboard/configurations" exact component={ConfigPage} />
				</Dashboard>
			</App>
		</BrowserRouter>
	</Provider>,
    document.getElementById('root')
);
registerServiceWorker();
