// Types
import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
} from '../types';

const initialState = {
    screams: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false
            }

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }

        case LIKE_SCREAM:

        break;
        
        case UNLIKE_SCREAM:

        break;

        default:
            return state;
    }
}