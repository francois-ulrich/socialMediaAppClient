// Types
import {
    SET_USER,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
} from '../types';

// Axios
import axios from 'axios'; 

// Fonction Helper mettant en place le header des requêtes
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;

    // Mise en place du Axios authorization request header 
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

// Action de récupération des données de l'utilisateur
export const logoutUser = () => (dispatch) => {
    // Oublie le token passé en storage
    localStorage.removeItem('FBIdToken');

    // Suppression du Axios authorization request header 
    delete axios.defaults.headers.common['Authorization'];

    // Dispatch de l'action de déconnexion
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

// Update des infos utilisateir
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