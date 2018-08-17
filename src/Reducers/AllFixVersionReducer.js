import { GET_ALL_FIX_VERSION } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_ALL_FIX_VERSION: 
            const successRes = action.payload.data.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}