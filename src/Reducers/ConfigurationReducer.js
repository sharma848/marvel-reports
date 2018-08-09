import { GET_CONFIGURATIONS } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_CONFIGURATIONS: 
            const successRes = action.payload.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}
