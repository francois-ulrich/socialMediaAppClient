// React
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// Nécesaire pour définir les types des props attendus
import PropTypes from 'prop-types';

// Redux stuff
import {connect} from 'react-redux';

// Syntaxe en => () retourne immédiatement un rendu
const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route 
        {...rest}
        render={(props) => 
            (authenticated && authenticated === true) ? <Redirect to="/" /> : <Component {...props} />
        }
    />
)

// Mise de authenticated en props de AuthRoute
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
})

// Définition des types des props requis par le composant
AuthRoute.propTypes = {
    user: PropTypes.object,
}


export default connect(mapStateToProps)(AuthRoute);