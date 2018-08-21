import { GET_PLAN_VS_ACTUAL_CHART_DATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_PLAN_VS_ACTUAL_CHART_DATA: 
            const successRes = action.payload.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}