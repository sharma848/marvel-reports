import { combineReducers } from 'redux';

import loginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import SignUpReducer from './SignUpReducer';
import UserDataReducer from './UserDataReducer';
import UserAccessReducer from './UserAccessReducer';
import AllProjectsReducer from './AllProjectsReducer';
import ConfigurationReducer from './ConfigurationReducer';
import TeamVelocityChartReducer from './TeamVelocityReducer';
import allFIxVersionReducer from './AllFixVersionReducer';
import fixVersionChartReducer from './fixVersionChartReducer';
import AllComponentReducer from './AllComponentReducer';
import componentChartReducer from './componentChartReducer';
import ReleaseBurndownChartReducer from './ReleaseBurndownChartReducer';
import PlanVsActualChartReducer from './PlanVsActualChartReducer';
import GenerateEpicDataReducer from './GenerateEpicDataReducer';
import GenerateVelocityDataReducer from './GenerateVelocityDataReducer';
import EpicPercentageCompletetionReducer from './EpicPercentageCompletetionReducer';
import CurrentSprintReportChartReducer from './CurrentSprintReportChartReducer';
import moduleSubModuleReducer from './moduleSubModuleReducer';
 
const rootReducer = combineReducers({
    loginData: loginReducer,
    dashboardData: DashboardReducer,
    signupData: SignUpReducer,
    usersData: UserDataReducer,
    userAccessData: UserAccessReducer,
    allProjectData: AllProjectsReducer,
    configData: ConfigurationReducer,
    teamVelocityChartData: TeamVelocityChartReducer,
    allFIxVersionData: allFIxVersionReducer,
    fixVersionChartData: fixVersionChartReducer,
    allComponentData: AllComponentReducer,
    componentChartData: componentChartReducer,
    ReleaseBurndownChartData: ReleaseBurndownChartReducer,
    PlanVsActualChartData: PlanVsActualChartReducer,
    GenerateEpicData: GenerateEpicDataReducer,
    GenerateVelocityData: GenerateVelocityDataReducer,
    EpicPercentageCompletetionData: EpicPercentageCompletetionReducer,
    CurrentSprintReportChartData: CurrentSprintReportChartReducer,
    moduleSubModuleData: moduleSubModuleReducer
});

export default rootReducer;