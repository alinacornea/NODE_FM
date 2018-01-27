import React, { Component } from 'react';
// import { BrowserRouter as Router,  Route, Link, Redirect} from 'react-router-dom';
import './Programs.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import  axios from 'axios';

class DataApi extends Component {
  constructor(props){
    super(props);
    this.state = {
      info:[],
      nodeR:'',
      nodeS:'',
      newField: '',
      dataField: ''
    }
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
    return (
        <div>
          <Tabs>
             <Tab label="Update Record" style={{height: '70px'}}>
             <div className="recordMid">
                  <TextField
                    floatingLabelText="Enter Layout"
                    name="edit"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={this.state.nodeS}/>
                  <TextField
                    floatingLabelText="Enter Record"
                    name="edit"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={this.state.nodeS}/>
                  <TextField
                    floatingLabelText="Enter Field"
                    name="edit"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={this.state.nodeS}/>
                  <TextField
                    floatingLabelText="Enter New Data"
                    name="edit"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={this.state.nodeS}/>
                <div className="button-line">
                  <RaisedButton type="submit"label="Update"  fullWidth={true} style={{marginTop:30}} primary onClick={this.updateData}/>
                </div>
              </div>
              </Tab>
              <Tab label="Create New" >
                <div className="recordMid">
                  <TextField
                    floatingLabelText="Enter Layout"
                    name="create"
                    onChange={this.onChange}
                    rows={2}
                    fullWidth={true}
                    value={this.state.newField}/>
                  <TextField
                    floatingLabelText="New Field"
                    name="create"
                    onChange={this.onChange}
                    rows={2}
                    fullWidth={true}
                    value={this.state.newField}/>
                  <TextField
                    floatingLabelText="New Data"
                    name="create"
                    rows={2}
                    fullWidth={true}
                    onChange={this.onChange}
                    value={this.state.dataField}/>
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
                    <RaisedButton type="submit" label="Delete Record" fullWidth={true} style={{marginTop:30}} primary onClick={this.updateData}/>
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
