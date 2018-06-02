import { GET_DASHBOARD } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_DASHBOARD: 
            const successRes = action.payload.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}
