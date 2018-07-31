import { USER_ACCEPT, USER_DECLINE } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case USER_ACCEPT: 
            const successRes = acceptRequest(action.payload);
            return { ...state, data: successRes};
        case USER_DECLINE: 
            const successRes = declineRequest(action.payload);
            return { ...state, data: successRes};
        default: 
            return state;
    }
}

function acceptRequest(apiResponse){
    let response = {};
    if(apiResponse.status === 200){
        response = apiResponse.data;
        response.status = 'approved';
    }

    return {
        response
    };
}

function declineRequest(apiResponse){
    let response = {};
    if(apiResponse.status === 200){
        response = apiResponse.data;
        response.status = 'declined';
    }

    return {
        response
    };
}