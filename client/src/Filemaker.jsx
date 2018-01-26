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
      nodeS:'',
      newField: '',
      dataField: ''

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

  //update existing field
  updateData = () => {
    const data = encodeURIComponent(this.state.nodeS);
    axios({
      method: 'post',
      url: '/filemaker-data',
      data: {NODE:data}
    }).then(res => {
      this.setState({nodeS: ''})
    }).catch(err => {
      console.log(err);
    })
  }

  //create new field
  createField = () => {
    const field = encodeURIComponent(this.newField);
    const data = encodeURIComponent(this.dataField);
    axios({
      method: 'post',
      url: '/filemaker-create',
      data:{
        field: field,
        data: data
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    });
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
            value={this.state.nodeS}/> <br/>
            <RaisedButton type="submit" label="Update" style={{width:'40%'}} primary onClick={this.updateData}/>
            <br/>
          </Paper>

          <Paper>
            <TextField
            floatingLabelText="New Field"
            name="create"
            onChange={this.onChange}
            value={this.state.newField}/>
            <br/>
            <TextField
            floatingLabelText="New Data"
            name="create"
            onChange={this.onChange}
            value={this.state.dataField}/> <br/>
            <RaisedButton type="submit" label="Create New Record" style={{width:'40%'}} primary onClick={this.createField}/>
            </Paper>

              <div className="items">
              <h4>filemaker --> node: {this.state.nodeR} </h4>
              <h3>DATA</h3>
                {data.map((item, idx) =>
                  <li key={idx}>{item['AttendeeSignIn::Name']} • {item['AttendeeSignIn::DOB']} • {item['AttendeeSignIn::ZipCode']} <br/>   </li>
                )}
              </div>
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
