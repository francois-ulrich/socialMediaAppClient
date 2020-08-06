import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// Material UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Theme
import themeObject from './util/theme';

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
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
