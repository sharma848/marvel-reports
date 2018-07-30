import { combineReducers } from 'redux';

import loginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import SignUpReducer from './SignUpReducer';

const rootReducer = combineReducers({
    loginData: loginReducer,
    dashboardData: DashboardReducer,
    signupData: SignUpReducer
});

export default rootReducer;