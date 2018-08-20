import { combineReducers } from 'redux';

import loginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import SignUpReducer from './SignUpReducer';
import UserDataReducer from './UserDataReducer';
import UserAccessReducer from './UserAccessReducer';
import AllProjectsReducer from './AllProjectsReducer';
import ConfigurationReducer from './ConfigurationReducer';
import VelocityChartReducer from './VelocityChartReducer';
import allFIxVersionReducer from './AllFixVersionReducer';
import fixVersionChartReducer from './fixVersionChartReducer';
import AllComponentReducer from './AllComponentReducer';
import componentChartReducer from './componentChartReducer';
 
const rootReducer = combineReducers({
    loginData: loginReducer,
    dashboardData: DashboardReducer,
    signupData: SignUpReducer,
    usersData: UserDataReducer,
    userAccessData: UserAccessReducer,
    allProjectData: AllProjectsReducer,
    configData: ConfigurationReducer,
    velocityChartData: VelocityChartReducer,
    allFIxVersionData: allFIxVersionReducer,
    fixVersionChartData: fixVersionChartReducer,
    allComponentData: AllComponentReducer,
    componentChartData: componentChartReducer
});

export default rootReducer;