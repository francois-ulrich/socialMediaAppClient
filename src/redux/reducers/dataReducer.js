// Types
import {
    SET_SCREAMS,
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    SUBMIT_COMMENT,
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function(state = initialState, action){
    let index;

    switch(action.type){
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false,
            }
 
        case SET_SCREAM:
            return{
                ...state,
                scream: action.payload,
            }

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case UNLIKE_SCREAM:
        case LIKE_SCREAM:
            // Récupération de l'index du scream liké
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);

            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }

            // Update du scream en question
            state.screams[index] = action.payload;

            return {
                ...state
            }

        case DELETE_SCREAM:
            let screamIndex = state.screams.findIndex(
                (scream) => scream.screamId === action.payload
            );

            state.screams.splice(screamIndex, 1);

            return {
            ...state
            };
        
        case POST_SCREAM:
            return{
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }

        case SUBMIT_COMMENT:
            // Récupération de l'index du scream liké
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);

            // console.log(state);
            // console.log(index);
            // console.log(state.screams[index]);

            console.log("state.screams[index].commentCount++");
            state.screams[index].commentCount++;

            console.log(state.screams[index].commentCount);

            // console.log(state.screams[index]);

            // state.screams[index].commentCount++;

            return {
                ...state,
                scream: {
                    ...state.scream, 
                    comments: [action.payload, ...state.scream.comments]
                }
            };

        default:
            return state;
    }
}