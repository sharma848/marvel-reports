import { GENERATE_EPIC_DATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GENERATE_EPIC_DATA: 
            const successRes = updateResponse(action.payload);
            return { ...state, data: successRes};
        default: 
            return state;
    }
}

function updateResponse(apiResponse) {
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