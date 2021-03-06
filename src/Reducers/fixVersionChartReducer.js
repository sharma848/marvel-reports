import { GET_FIX_VERSION_CHART_DATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_FIX_VERSION_CHART_DATA: 
            const successRes = action.payload.data.data;
            const stateClone = state;
            stateClone[action.id] = {
                data: successRes
            }
            return Object.assign({}, stateClone);
        default: 
            return state;
    }
}