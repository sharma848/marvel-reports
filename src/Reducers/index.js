import { combineReducers } from 'redux';

import loginReducer from './LoginReducer';

const rootReducer = combineReducers({
    loginData: loginReducer
});

export default rootReducer;