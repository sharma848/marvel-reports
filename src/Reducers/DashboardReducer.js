import { GET_DASHBOARD, GET_USER_DASHBOARD } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_DASHBOARD: 
            const successRes = action.payload.data;
            return { ...state, data: successRes};
        case GET_USER_DASHBOARD: 
            const userSuccessRes = action.payload.data.data;
            return { ...state, userData: userSuccessRes};
        default: 
            return state;
    }
}
