import {
    createStore, 
    combineReducers, 
    applyMiddleware,
    compose
} from 'redux';

import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const initialState = {};

// "Middleware extends the store's abilities, and lets you write async logic that interacts with the store."
const middleware = [thunk];

// Actions: Font les opérations avec l'API
// Reducers: Permettent d'intéragir avec le store
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer,
});

const store = createStore(
    reducers, 
    initialState,
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;