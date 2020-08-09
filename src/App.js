import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// Material UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Theme
import themeObject from './util/theme';

// Décodeur de token
import jwDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.FBIdToken;

// Décoder le token
if(token){
  const decodedToken = jwDecode(token);

  if(decodedToken.exp * 1000 <= Date.now()){
    // localStorage.removeItem("FBIdToken");
    authenticated = false;

    window.location.href = "/login";

    localStorage.removeItem('FBIdToken');
  }else{
    authenticated = true;
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <Navbar/>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                  <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
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
