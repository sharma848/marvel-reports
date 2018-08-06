import { USER_ACCEPT, USER_DECLINE, EMPTY_STATE_USERACCESSDATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case USER_ACCEPT: 
            const successResAccept = acceptRequest(action.payload);
            return { ...state, data: successResAccept};
        case USER_DECLINE: 
            const successResDecline = declineRequest(action.payload);
            return { ...state, data: successResDecline};
        case EMPTY_STATE_USERACCESSDATA: 
            return {};
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