import React, { Component } from 'react';
// import { BrowserRouter as Router,  Route, Link, Redirect} from 'react-router-dom';
import './Programs.css';
import Auth from './Auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import  axios from 'axios';

const input = {
   WebkitBoxShadow: '0 0 0 1000px lightgrey inset'
}

class DataApi extends Component {
  constructor(props){
    super(props);
    this.state = {
      info:[],
      data: {
        field: '',
        layout: '',
        recordId: '',
        newData: ''
      }
    }
  }


  onChange = (event, value) => {
    const field = event.target.name;
    const data = this.state.data;
    data[field] = event.target.value;
    this.setState({
      data
    });
  }

  //update existing field
  updateData = () => {
    const solution = encodeURIComponent(Auth.getSolution());
    const layout = encodeURIComponent(Auth.getLayout());
    const token = encodeURIComponent(Auth.getToken());
    const field = encodeURIComponent(this.state.data.field);
    const recordId = encodeURIComponent(this.state.data.recordId);
    const newData = encodeURIComponent(this.state.data.newData);

    const send = {
      solution: solution,
      token: token,
      layout: layout,
      field: field,
      recordId: recordId,
      data: newData
    }

    axios({
      method: 'post',
      url: '/filemaker-update',
      data: send
    }).then(res => {
      this.setState({data: {}})
    }).catch(err => {
      console.log(err);
    })
  }

  //create new field
  createField = () => {
    const solution = encodeURIComponent(Auth.getSolution());
    const layout = encodeURIComponent(Auth.getLayout());
    const token = encodeURIComponent(Auth.getToken());
    const field = encodeURIComponent(this.state.data.field);
    const newData = encodeURIComponent(this.state.data.newData);

    const send = {
      solution: solution,
      token: token,
      layout: layout,
      field: field,
      newData: newData
    }

    axios({
      method: 'post',
      url: '/filemaker-create',
      data: send
    }).then(res => {
      console.log(res)
      this.setState({data: {}})
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { data } = this.state;

    return (
        <div>
          <Tabs>
             <Tab label="Update Record" style={{height: '70px'}}>
             <div className="recordMid">
                  <TextField
                     floatingLabelText="Enter Field"
                     name="field"
                     onChange={this.onChange}
                     fullWidth={true}
                     value={data.field}/>
                  <TextField
                    floatingLabelText="Enter Record"
                    name="recordId"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={data.recordId}/>
                  <TextField
                    floatingLabelText="Enter New Data"
                    name="newData"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={data.newData}/>
                <div className="button-line">
                  <RaisedButton type="submit"label="Update"  fullWidth={true} style={{marginTop:30}} primary onClick={this.updateData}/>
                </div>
              </div>
              </Tab>

              <Tab label="Create Record" >
                <div className="recordMid">
                  <TextField
                    inputStyle={input}
                    floatingLabelText="Enter Layout"
                    name="layout"
                    onChange={this.onChange}
                    rows={2}
                    fullWidth={true}
                    value={data.layout}/>
                  <TextField
                    inputStyle={input}
                    floatingLabelText="New Field"
                    name="field"
                    onChange={this.onChange}
                    rows={2}
                    fullWidth={true}
                    value={data.field}/>
                  <TextField
                    inputStyle={input}
                    floatingLabelText="New Data"
                    name="newData"
                    rows={2}
                    fullWidth={true}
                    onChange={this.onChange}
                    value={data.newData}/>
                  <div className="button-line">
                    <RaisedButton type="submit" label="Create New Record" fullWidth={true} style={{marginTop:30}} primary onClick={this.createField}/>
                  </div>
               </div>
              </Tab>

              <Tab label="Delete Record" >
               <div className="recordMid">
                   <TextField
                   floatingLabelText="Enter Layout"
                   name="delete"
                   rows={2}
                   fullWidth={true}
                   onChange={this.onChange}
                   value={this.state.nodeS}/>
                   <TextField
                   floatingLabelText="Enter Record ID"
                   name="delete"
                   rows={2}
                   fullWidth={true}
                   onChange={this.onChange}
                   value={this.state.nodeS}/>
                  <div className="button-line">
                    <RaisedButton type="submit" label="Delete Record" fullWidth={true} style={{marginTop:30}} primary onClick={this.dataData}/>
                  </div>
               </div>
              </Tab>
              <Tab label="Get Record" >
               <div className="recordMid">
                 <TextField
                 floatingLabelText="New Value"
                 name="get"
                 rows={2}
                 fullWidth={true}
                 onChange={this.onChange}
                 value={this.state.nodeS}/> <br/>
                <div className="button-line">
                 <RaisedButton type="submit" label="Get Record" fullWidth={true} style={{marginTop:30}} primary onClick={this.updateData}/>
                </div>
               </div>
              </Tab>
          </Tabs>
        </div>
    );
  }
};

export default DataApi;
