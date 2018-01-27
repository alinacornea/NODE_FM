import React, { Component } from 'react';
// import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import ActionHome from 'material-ui/svg-icons/action/home';
import Toolbar from 'material-ui/Toolbar';

import './App.css';
import Programs from './Programs';
import Filemaker from './Filemaker';
import DataApi from './DataApi';
import Home from './Home';
import Auth from './Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        authenticated: false
      }
    };

    componentDidMount() {
      this.toggleAuthenticateStatus()
    }

    toggleAuthenticateStatus() {
      this.setState({ authenticated: Auth.isUserAuthenticated() })
    }

  render() {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router>
      <div>
        <Toolbar style={{backgroundColor: '#EAEAEA'}}>
              <div className="top-bar-left" style={{margin:10}}>
               <Link to="/"><ActionHome className="homepage_main"color='black' style={{width:35, height:35}}/> </Link>
              </div>
                <div className="top-bar-right" style={{ margin:10}}>
                  <Link to="/programs" style={{ margin:10}}>Programs</Link>
                  <Link to="/filemaker"style={{ margin:10}}>Filemaker</Link>
                  <Link to="/dataapi"style={{ margin:10}}>DataApi</Link>
                </div>
       </Toolbar>
            <Route exact path="/" component={Home} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}/>
            <PrivateRoute path="/programs" component={Programs}/>
            <PrivateRoute path="/dataapi" component={DataApi}/>
            <PrivateRoute path="/filemaker" component={Filemaker}/>
      </div>
      </Router>
    </MuiThemeProvider>
    );
  }
}

export default App;



// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo" />
// </header>
