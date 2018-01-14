import React, { Component } from 'react';
// import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import ActionHome from 'material-ui/svg-icons/action/home';
import Toolbar from 'material-ui/Toolbar';

import './App.css';
import Programs from './Programs';
import Filemaker from './Filemaker';

class App extends Component {

  render() {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
      <div>
        <Toolbar style={{backgroundColor: '#EAEAEA'}}>
              <div className="top-bar-left" style={{margin:10}}>
               <Link to="/"><ActionHome className="homepage_main"color='black' style={{width:35, height:35}}/> </Link>
              </div>
                <div className="top-bar-right" style={{ margin:10}}>
                  <Link to="/programs" style={{ margin:10}}>Programs</Link>
                  <Link to="/filemaker"style={{ margin:10}}>Filemaker</Link>
                </div>
       </Toolbar>
            <Route path="/programs" component={Programs}/>
            <Route path="/filemaker" component={Filemaker}/>
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
