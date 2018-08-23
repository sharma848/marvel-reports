import { CURRENT_SPRINT_REPORT_DATA } from '../Actions/index';

export default function(state={}, action) {
    switch(action.type) {
        case CURRENT_SPRINT_REPORT_DATA: 
            const successResponse = action.payload.data;
            return {...state, data: successResponse};
        default:
            return state;
    }
}