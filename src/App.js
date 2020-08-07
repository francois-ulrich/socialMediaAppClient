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

// const styles = {
//   form:{
//       textAlign: 'center'
//   },
//   pageTitle: {
//       margin: '20px auto',
//       textAlign: 'center'
//   },
//   button:{
//       marginTop: '40px',
//       position: 'relative'
//   },
//   textField: {
//       margin: '0 10px 10px 0'
//   },
//   customError:{
//       color: 'red',
//       fontSize: '0.8rem'
//   },
//   progress:{
//       width: "30px",
//       height: "30px",
//       display: "block",
//       margin: "10px auto 0",
//   }
// }

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
  }else{
    authenticated = true;
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  }
}

export default App;
