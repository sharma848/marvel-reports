import { combineReducers } from 'redux';

import loginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';

const rootReducer = combineReducers({
    loginData: loginReducer,
    dashboardData: DashboardReducer
});

export default rootReducer;