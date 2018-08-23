import { EPIC_PERCENTAGE_COMPLETETION } from '../Actions/index';

export default function (state={}, action) {
    switch(action.type) {
        case EPIC_PERCENTAGE_COMPLETETION: 
            const successRes = action.payload.data.data;
            const stateClone = state;
            stateClone[action.id.type] = {
                data: successRes
            }
            return Object.assign({}, stateClone);
        default: 
            return state;
    }
}
