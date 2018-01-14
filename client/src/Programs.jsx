import React, { Component } from 'react';
// import { BrowserRouter as Router,  Route, Link, Redirect} from 'react-router-dom';
import './Programs.css';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class Programs extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('/programs')
      .then(res => res.json())
      .then((res) => {this.setState({ data: res })
      })
  }


  render() {
    return (
        <div className="App">
        <Paper>
          <h1>Program Names</h1>
          {this.state.data.map((item, key) =>
            <Menu>
              <div className="programName"key={key}>{item.fieldData.EventName} <br/> {item.fieldData.EventType} <br/></div>
              <Divider/>
            </Menu>
          )}
          </Paper>
        </div>
    );
  }
}

export default Programs;
