import { SIGNUP_USER } from '../Actions/index'

export default function (state={}, action) {
    switch(action.type) {
        case SIGNUP_USER: 
            const successRes = updateSignupState(action.payload);
            return { ...state, data: successRes};
        default: 
            return state;
    }
}

function updateSignupState(apiResponse){
    let response = {};
    let statusCode = 0;
    let message = '';
    if(apiResponse.status === 200) {
        response = apiResponse.data;
        statusCode = apiResponse.status;
    } else if(apiResponse.status === 208){
        message = apiResponse.data.message
        statusCode = apiResponse.status;
        console.log(apiResponse.data.message)
    }else {
        statusCode = apiResponse.status;
    }

    return {
        statusCode,
        data: response,
        message: message
    };
}