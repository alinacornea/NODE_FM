import React, { Component } from 'react';
// import { BrowserRouter as Router,  Route, Link, Redirect} from 'react-router-dom';
import './Programs.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import  axios from 'axios';

class Filemaker extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [{
        recordId:'',
        dob: '',
        ethnicity: '',
        gender: '',
        name:'',
        zip: ''
      }],
      info:[],
      nodeR:'',
      nodeS:''
    }
  }

  componentDidMount() {
    fetch('/filemaker')
      .then(res => res.json())
      .then((res) => {
        // const arr = res.data[0].portalData.AttendeeSignIn[0]['AttendeeSignIn::DOB']
        this.setState({nodeR: res.data[0].fieldData.NODE_S});
        for (var key in res.data) {
            for(var id in res.data[key].portalData.AttendeeSignIn){
              let data = res.data[key].portalData.AttendeeSignIn[id];
              this.setState({ info: [...this.state.info, data] })
            }
          }
      })
  }

  onChange = (e) => {
    this.setState({
      nodeS : e.target.value
    });
  }

  sendData = () => {
    const data = encodeURIComponent(this.state.nodeS);
    axios({
      method: 'post',
      url: '/filemaker-data',
      data: {NODE:data}
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    const data = this.state.info;
    // console.log(this.state.info);
    return (
        <div className="App">
          <Paper>
            <TextField
            floatingLabelText="New Value"
            name="nodeS"
            onChange={this.onChange}
            value={this.state.nodeS}/>
            <RaisedButton type="submit" label="Submit" primary onClick={this.sendData}/>

            <h1>DATA</h1>
            <h2>NODE:{this.state.nodeR} </h2>
              <div className="items">
                {data.map((item, idx) =>
                  <li key={idx}>{item['AttendeeSignIn::Name']} • {item['AttendeeSignIn::DOB']} • {item['AttendeeSignIn::ZipCode']} <br/>   </li>
                )}
              </div>
          </Paper>
        </div>
    );
  }
}

export default Filemaker;

// {this.state.data.map((item, key, id) =>
//   <div className="programs">
//     <div className="programName"key={item.recordId}>{item.fieldData.EventName}</div>
//     <div key={id}>{item.fieldData.EventType}</div>
//     <div key={key}>{item.fieldData.EventDate}</div>
//     <br/>
//   </div>
// )}
