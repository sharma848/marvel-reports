import { combineReducers } from 'redux';

import loginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import SignUpReducer from './SignUpReducer';
import UserDataReducer from './UserDataReducer';
import UserAccessReducer from './UserAccessReducer';
import AllProjectsReducer from './AllProjectsReducer';

const rootReducer = combineReducers({
    loginData: loginReducer,
    dashboardData: DashboardReducer,
    signupData: SignUpReducer,
    usersData: UserDataReducer,
    userAccessData: UserAccessReducer,
    allProjectData: AllProjectsReducer
});

export default rootReducer;