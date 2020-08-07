import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// Syntaxe en => () retourne immédiatement un rendu
const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route 
        {...rest}
        render={(props) => 
            authenticated === true ? <Redirect to="/" /> : <Component {...props} />
        }
    />
)

export default AuthRoute;