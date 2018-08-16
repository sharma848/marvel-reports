import { GET_VELOCITY_CHART_DATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_VELOCITY_CHART_DATA: 
            const successResAccept = action.payload.data;
            return { ...state, data: successResAccept};
        default: 
            return state;
    }
}
