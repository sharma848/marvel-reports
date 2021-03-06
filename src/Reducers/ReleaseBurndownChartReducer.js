import { GET_RELEASE_BURNDOWN_CHART_DATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_RELEASE_BURNDOWN_CHART_DATA: 
            const successRes = action.payload.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}