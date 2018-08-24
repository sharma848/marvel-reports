import { GET_ALL_PROJECTS } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case GET_ALL_PROJECTS: 
            const successRes = action.payload.data ? action.payload.data.data : action.payload.response.data;
            return { ...state, data: successRes};
        default: 
            return state;
    }
}