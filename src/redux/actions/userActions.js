// Types
import {
    SET_USER,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
} from '../types';

// Axios
import axios from 'axios'; 

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;

    axios.defaults.headers.common['Authorization'] = FBIdToken;

    localStorage.setItem('FBIdToken', FBIdToken);
}

// Action de login
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });

    axios
    .post("/login", userData)
    .then(res => {
        setAuthorizationHeader(res.data.token);

        dispatch(getUserData());

        dispatch({
            type: CLEAR_ERRORS,
        });

        history.push('/');
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');

    delete axios.defaults.headers.common['Authorization'];

    dispatch({
        type: SET_UNAUTHENTICATED,
    });
}

// Action de déconnexion
export const getUserData = () => (dispatch) => {
    dispatch({
        type: LOADING_USER
    });

    axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
    });
}

// Action d'inscription
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });

    axios
    .post("/signup", newUserData)
    .then(res => {
        setAuthorizationHeader(res.data.token);

        dispatch(getUserData());

        dispatch({
            type: CLEAR_ERRORS,
        });

        history.push('/');
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}

// Image profile upload
export const uploadImage = (formData) => (dispatch) => {
    dispatch({
        type: LOADING_USER
    });

    axios
    .post("/user/image", formData)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => {
        console.log(err)
    });
}

// Update des infos utilisateur
export const editUserDetails = (newUserData) => (dispatch) => {
    dispatch({
        type: LOADING_USER
    });

    axios
    .post("/user", newUserData)
    .then(res => {
        dispatch(getUserData());

        dispatch({
            type: CLEAR_ERRORS,
        });
    })
    .catch(err => {
        console.log(err);
    });
}

export const markNotificationsRead = (notifications) => (dispatch) => {
    axios
    .post("/notifications", notifications)
    .then(res => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ,
        });
    })
    .catch(err => {
        console.log(err);
    });
}