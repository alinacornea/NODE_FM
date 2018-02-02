import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import ActionHome from 'material-ui/svg-icons/action/home';
import Toolbar from 'material-ui/Toolbar';

import Programs from './Programs';
import Filemaker from './Filemaker';
import DataApi from './DataApi';
import Home from './Home';
import Auth from './Auth';
import Logout from './Logout';
import './App.css';

const style = {
    margin:10,
    fontStyle: 'bold',
    color: '#ff8a65'
  }

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

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

    toggleAuthenticateStatus = () => {
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
                  <Link to="/programs" style={style}>Program Events</Link>
                  <Link to="/filemaker"style={style}>Booking Events</Link>
                  <Link to="/dataapi"style={style}>Data API</Link>
                </div>
       </Toolbar>
          {this.state.authenticated ? (
            <Route exact path="/" component={Logout}/>
              ) : (
            <LoggedOutRoute exact path="/" component={Home} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}/>
           )}
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
