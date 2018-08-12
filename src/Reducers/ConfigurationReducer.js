import { GET_CONFIGURATIONS, SET_CONFIGURATIONS } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_CONFIGURATIONS: 
            const successResGet = action.payload.data;
            return { ...state, data: successResGet};
        case SET_CONFIGURATIONS: 
            const successResSet = action.payload.data;
            return { ...state, data: successResSet};
        default: 
            return state;
    }
}
