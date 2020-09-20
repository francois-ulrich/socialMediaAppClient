// Types
import {
    SET_SCREAMS,
    SET_SCREAM,
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
    axios.post( `/scream/${screamId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err) );
}

// Unlike scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios.post( `/scream/${screamId}/unlike`)
    .then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err) );
}