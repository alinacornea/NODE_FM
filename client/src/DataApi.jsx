import React, { Component } from 'react';
import  axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Auth from './Auth';
import './Programs.css';

const input = {
   WebkitBoxShadow: '0 0 0 1000px lightgrey inset'
}

class DataApi extends Component {
  constructor(props){
    super(props);
    this.state = {
      info:[],
      dialog: false,
      update: false,
      del: false,
      error: false,
      data: {
        field: '',
        layout: '',
        recordId: '',
        newData: ''
      }
    }
  }

  handleClose = () => {
    this.setState({dialog: false, update: false, del: false, error: false});
  };

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
      const data = this.state.data;
      data['field'] = '';
      data['recordId'] = '';
      data['newData'] = '';
      this.setState({data, update: true})
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
      const data = this.state.data;
      data['field'] = '';
      data['newData'] = '';

      this.setState({data})
    }).catch(err => {
      console.log(err);
    });
  }

  deleteRecord = () => {
    const solution = encodeURIComponent(Auth.getSolution());
    const token = encodeURIComponent(Auth.getToken());
    const layout = encodeURIComponent(this.state.data.layout);
    const recordId = encodeURIComponent(this.state.data.recordId);
    const send = {
      solution: solution,
      token: token,
      layout: layout,
      recordId: recordId
    }

    axios({
      method: 'post',
      url: '/filemaker-delete',
      data: send
    }).then(res => {
      const data = this.state.data;
      data['layout'] = '';
      data['recordId'] = '';

      this.setState({data, del: true})
    }).catch(err => {
      console.log(err);
    });
  }

  getRecord = () => {
    const solution = encodeURIComponent(Auth.getSolution());
    const token = encodeURIComponent(Auth.getToken());
    const layout = encodeURIComponent(this.state.data.layout);
    const recordId = encodeURIComponent(this.state.data.recordId);
    const send = {
      solution: solution,
      token: token,
      layout: layout,
      recordId: recordId
    }

    axios({
      method: 'POST',
      url: '/filemaker-get',
      data: send
    }).then(res => {
      console.log(res);

      const data = this.state.data;
      data['layout'] = '';
      data['recordId'] = '';

      for (var key in res.data) {
          for(var id in res.data[key].portalData.AttendeeSignIn){
            let data = res.data[key].portalData.AttendeeSignIn[id];
            this.setState({ info: [...this.state.info, data] })
          }
        }
      this.setState({data, dialog: true})
    }).catch(err => {
      this.setState({error: true});
    });
  }

  render() {
    const { data } = this.state;
    const info = this.state.info;

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />
    ];
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
                {(this.state.update ? (<Dialog
                  title="Message:"
                  actions={actions}
                  modal={true}
                  open={this.state.update}
                >
                  Your record was updated succesfully!!
                </Dialog>) : ''
                )}
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
                   inputStyle={input}
                   floatingLabelText="Enter Layout"
                   name="layout"
                   rows={2}
                   fullWidth={true}
                   onChange={this.onChange}
                   value={data.layout}/>

                   <TextField
                   inputStyle={input}
                   floatingLabelText="Enter Record ID"
                   name="recordId"
                   rows={2}
                   fullWidth={true}
                   onChange={this.onChange}
                   value={data.recordId}/>
                  <div className="button-line">
                    <RaisedButton type="submit" label="Delete Record" fullWidth={true} style={{marginTop:30}} primary onClick={this.deleteRecord}/>
                  </div>
                  {(this.state.del ? (<Dialog
                    title="Message:"
                    actions={actions}
                    modal={true}
                    open={this.state.del}
                  >
                    Your record was deleted succesfully!!
                  </Dialog>) : ''
                  )}
               </div>
              </Tab>
              <Tab label="Get Record" >
               <div className="recordMid">
                 <TextField
                 inputStyle={input}
                 floatingLabelText="Enter Layout"
                 name="layout"
                 rows={2}
                 fullWidth={true}
                 onChange={this.onChange}
                 value={data.layout}/>

                 <TextField
                 inputStyle={input}
                 floatingLabelText="Enter Record Id"
                 name="recordId"
                 rows={2}
                 fullWidth={true}
                 onChange={this.onChange}
                 value={data.recordId}/>

                <div className="button-line">
                 <RaisedButton type="submit" label="Get Record" fullWidth={true} style={{marginTop:30}} primary onClick={this.getRecord}/>
                </div>
                {(this.state.error ? (<Dialog
                  title="Error retrieved:"
                  actions={actions}
                  modal={true}
                  open={this.state.error}
                >
                  Make sure the record ID is a number and exist!
                </Dialog>) :
                (this.state.dialog ? (<Dialog
                  title="Data received:"
                  actions={actions}
                  modal={true}
                  open={this.state.dialog}
                >
                <Table>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Birthday</TableHeaderColumn>
                      <TableHeaderColumn>Ethnicity</TableHeaderColumn>
                      <TableHeaderColumn>ZipCode</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                      {info.map((item, idx) =>
                          <TableRow key={idx}>
                            <TableRowColumn>{item['AttendeeSignIn::Name']}</TableRowColumn>
                            <TableRowColumn>{item['AttendeeSignIn::DOB']}</TableRowColumn>
                            <TableRowColumn>{item['AttendeeSignIn::Ethnicity']}</TableRowColumn>
                            <TableRowColumn>{item['AttendeeSignIn::ZipCode']}</TableRowColumn>
                          </TableRow>
                      )}
                 </TableBody>
              </Table>
                </Dialog>) : ''
                )
              )}

               </div>
              </Tab>
          </Tabs>
        </div>
    );
  }
};

export default DataApi;
