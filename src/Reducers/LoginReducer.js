import { LOGIN_USER } from '../Actions/index';
import _ from 'lodash';

export default function (state={}, action) {
    switch(action.type) {
        case LOGIN_USER: 
            const successRes = updateLoginState(action.payload);
            return { ...state, data: successRes};
        default: 
            return state;
    }
}

function updateLoginState(apiResponse) {
    let response = {};
    let statusCode = 0;
    let message = '';
    let isSuccess = false;
    if(apiResponse.status === 200) {
        isSuccess = true;
        response = apiResponse.data;
        message = apiResponse.message;
        statusCode = apiResponse.status;
    } else {
        isSuccess = false;
        statusCode = apiResponse.status;
        message = apiResponse.message;
    }

    return {
        statusCode,
        data: response,
        message,
        isSuccess
    };
}