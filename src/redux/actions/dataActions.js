// Types
import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
} from '../types';

// Axios
import axios from 'axios'; 

// Load screams
export const loadScreams = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios.get('/screams')
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })

        console.log(err);
    });
}

// Like scream
export const likeScream = (screamId) => (dispatch) => {
    dispatch({
        type: LIKE_SCREAM
    });

    axios.post( `/screams/${screamId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
    });
}

// Unlike scream