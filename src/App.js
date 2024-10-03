import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Material UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import Home from './pages/Home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

// Theme
import themeObject from './util/theme';

// Décodeur de token
import jwDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Axios
import axios from 'axios';

// Types
import {
  SET_AUTHENTICATED,
} from './redux/types';

import {
  logoutUser,
  getUserData
} from './redux/actions/userActions';

const theme = createTheme(themeObject);

axios.defaults.baseURL = "https://europe-west1-socialmediaapp-de7d3.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwDecode(token);

  if (decodedToken.exp * 1000 <= Date.now()) {
    store.dispatch(logoutUser());

    window.location.href = "/login";
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    });

    // Mise en place du Axios authorization request header 
    axios.defaults.headers.common['Authorization'] = token;

    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route exact path="/users/:handle/scream/:screamId" component={user} />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
