import { USER_DATA } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case USER_DATA: 
            const successRes = action.payload.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}
