// Types
import {
    SET_SCREAMS,
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
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
        });

        console.log(res.data);
    })
    .catch(err => console.log(err) );
}

// Unlike scream
export const deleteScream = (screamId) => (dispatch) => {
    axios.delete( `/scream/${screamId}`)
    .then(res => {
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        });
    })
    .catch(err => console.log(err) );
}

// Post scream
export const postScream = (screamData) => (dispatch) => {
    dispatch({type: LOADING_UI});
    
    axios.post( `/scream`, screamData)
    .then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        });

        dispatch({type: CLEAR_ERRORS});
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
}

export const getScream = (screamId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    
    axios.get( `/scream/${screamId}`)
    .then(res => {
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });

        dispatch({type: STOP_LOADING_UI});
    })
    .catch(err => {
        console.log(err);
    });
}

// export const submitComment = (screamId, commentData) => (dispatch) => {
//     dispatch({type: LOADING_UI});
    
//     axios.post( `/scream/${screamId}/comment`, commentData)
//     .then(res => {
//         console.log(res);
//         dispatch({
//             type: SUBMIT_COMMENT,
//             payload: res.data
//         });

//         dispatch({type: STOP_LOADING_UI});
//     })
//     .catch(err => {
//         dispatch({
//             type: SET_ERRORS,
//             payload: err.response.data
//         });
//     });
// }

export const submitComment = (screamId, commentData) => (dispatch) => {
    axios
      .post(`/scream/${screamId}/comment`, commentData)
      .then((res) => {
        console.log("res.data");
        console.log(res.data);

        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });

        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Action de déconnexion
export const getUserData = (handle) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios.get(`/user/${handle}`)
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        });
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        });
    });
}