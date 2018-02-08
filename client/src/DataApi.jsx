import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import  axios from 'axios';
//material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import Auth from './Auth';
import './Programs.css';

const input = {
   WebkitBoxShadow: '0 0 0 1000px lightgrey inset'
}

var styles = {
  dialogRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0
  },
  dialogContent: {
    position: 'relative',
    width: '90%',
    maxWidth: 500
  },
  dialogBody: {
    paddingBottom: 0
  },
  dropzone:{
    border:'none',
  }
};

class DataApi extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      messageErr: '',
      errors:{},
      info:[],
      dialog: false,
      open: false,
      error: false,
      record: '',
      file: '',
      type: '',
      preview: '',
      data: {
        field: '',
        layout: '',
        recordId: '',
        newData: ''
      }
    }
  }

  newPicture = (files) => {
    this.setState({preview: files[0].preview, open:true, type: files[0].type});

    var file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = encodeURIComponent(event.target.result);
        this.setState({file: image})
      };
      reader.readAsDataURL(file);
  }

  savePicture = () => {
    const base = Auth.getBaseInfo();
    const field = encodeURIComponent(this.state.data.field);
    const type = encodeURIComponent(this.state.type);
    const image = this.state.file;
    const send = {
      base,
      type: type,
      image: image,
      field: field
    }
    axios({
      method: 'post',
      url: '/filemaker-image',
      data: send
    }).then(res => {
      // console.log(res);
      let message = res.data.message;
      let record = res.data.data.recordId;
      this.setState({open:false, message: message, record: record})
      setInterval(() => {
              this.setState({message: ''})
          }, 8000);
    }).catch(err => {
      console.log(err);
    })
  }

  handleClose = () => {
    this.setState({dialog: false, error: false, open:false});
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
    const base = Auth.getBaseInfo();
    const field = encodeURIComponent(this.state.data.field);
    const recordId = encodeURIComponent(this.state.data.recordId);
    const newData = encodeURIComponent(this.state.data.newData);
    const send = {
      base,
      field: field,
      recordId: recordId,
      data: newData
    }

    axios({
      method: 'post',
      url: '/filemaker-update',
      data: send
    }).then(res => {
      if (!res.data.error){
        const data = this.state.data;
        let message = res.data.message;
        data['field'] = '';
        data['recordId'] = '';
        data['newData'] = '';
        this.setState({data, message: message, errors:{}})
      }
      else{
        const errors = res.data.errors;
        const message = res.data.message;
        this.setState({errors, messageErr: message});
      }
      setInterval(() => {
        this.setState({message: '', messageErr: ''})
      }, 6000);
    }).catch(err => {
      console.log(err);
    })
  }

  //create new record
  createRecord = () => {
    let base = Auth.getBaseInfo();
    let layout = encodeURIComponent(this.state.data.layout);
    let field = encodeURIComponent(this.state.data.field);
    let newData = encodeURIComponent(this.state.data.newData);
    let send = {
      base,
      field: field,
      layout: layout,
      newData: newData
    }

    axios({
      method: 'post',
      url: '/filemaker-create',
      data: send
    }).then(res => {
      console.log(res.data);
      let data = this.state.data;
      let message = res.data.message;
      if (!res.data.error){
        let record = res.data.data.recordId;
        data['layout'] = '';
        data['field'] = '';
        data['newData'] = '';
        this.setState({data, message: message, errors:{}, record: record})
      }
      else{
        let errors = res.data.errors;
        this.setState({errors, messageErr: message});
      }

      setInterval(() => {
        // data['layout'] = '';
        // data['field'] = '';
        // data['newData'] = '';
        this.setState({errors:{}, message: '', messageErr: ''})
      }, 7000);
    }).catch(err => {
      console.log(err);
    });
  }

  //delete record
  deleteRecord = () => {
    const base = Auth.getBaseInfo();
    const layout = encodeURIComponent(this.state.data.layout);
    const recordId = encodeURIComponent(this.state.data.recordId);
    const send = {
      base,
      layout: layout,
      recordId: recordId
    }

    axios({
      method: 'post',
      url: '/filemaker-delete',
      data: send
    }).then(res => {
      // console.log(res.data);
      let data = this.state.data;
      let message = res.data.message;
      if (!res.data.error){
        data['layout'] = '';
        data['recordId'] = '';
        this.setState({data, message: message, errors:{}})
      }
      else{
        let errors = res.data.errors;
        this.setState({errors, messageErr: message});
      }
      setInterval(() => {
        this.setState({errors:{}, message: '', messageErr: ''})
      }, 6000);
    }).catch(err => {
      console.log(err);
    });
  }

  //get record
  getRecord = () => {
    const base = Auth.getBaseInfo();
    const layout = encodeURIComponent(this.state.data.layout);
    const recordId = encodeURIComponent(this.state.data.recordId);
    const send = {
      base,
      layout: layout,
      recordId: recordId
    }
    axios({
      method: 'POST',
      url: '/filemaker-get',
      data: send
    }).then(res => {
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
      const data = this.state.data;
      data['layout'] = '';
      data['recordId'] = '';
      this.setState({data, error: true});
    });
  }

  render() {
    const { data, message, record, errors, messageErr } = this.state;
    const info = this.state.info;

    //dialog actions
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const action = [
      <RaisedButton type="submit" label="Upload Picture" fullWidth={true} style={{marginBottom:20}} primary onClick={this.savePicture}/>
    ]

    return (
        <div>
          <Tabs>
             <Tab label="Update Record" style={{height: '70px'}}>
             <div className="recordMid">
             {message && <p className="display-message">{message}</p>}
             {messageErr && <p className="error-message">{messageErr}</p>}
                  <TextField
                     floatingLabelText="Enter Field"
                     name="field"
                     onChange={this.onChange}
                     fullWidth={true}
                     errorText={errors.field}
                     value={data.field}/>
                  <TextField
                    floatingLabelText="Enter Record ID"
                    name="recordId"
                    onChange={this.onChange}
                    fullWidth={true}
                    errorText={errors.recordId}
                    value={data.recordId}/>
                  <TextField
                    floatingLabelText="Enter New Data"
                    name="newData"
                    onChange={this.onChange}
                    fullWidth={true}
                    value={data.newData}/>
                <div className="button-line">
                  <RaisedButton type="submit"label="Update"  fullWidth={true} style={{marginTop:30}} secondary onClick={this.updateData}/>
                </div>
              </div>
              </Tab>

              <Tab label="Create Record" >
                <div className="recordMid">
                {message && <p className="display-message">{message} <br/> New record ID: {record}</p>}
                {messageErr && <p className="error-message">{messageErr}</p>}
                  <TextField
                    inputStyle={input}
                    floatingLabelText="Enter Layout"
                    name="layout"
                    onChange={this.onChange}
                    rows={2}
                    fullWidth={true}
                    errorText={errors.layout}
                    value={data.layout}/>
                  <TextField
                    inputStyle={input}
                    floatingLabelText="Enter Field"
                    name="field"
                    onChange={this.onChange}
                    rows={2}
                    errorText={errors.field}
                    fullWidth={true}
                    value={data.field}/>
                  <TextField
                    inputStyle={input}
                    floatingLabelText="Enter New Data"
                    name="newData"
                    rows={2}
                    fullWidth={true}
                    onChange={this.onChange}
                    value={data.newData}/>
                  <div className="button-line">
                    <RaisedButton type="submit" label="Create New Record" fullWidth={true} style={{marginTop:30}} secondary onClick={this.createRecord}/>
                  </div>

               </div>
              </Tab>

              <Tab label="Delete Record" >
               <div className="recordMid">
               {message && <p className="display-message">{message}</p>}
                   <TextField
                   inputStyle={input}
                   floatingLabelText="Enter Layout"
                   name="layout"
                   rows={2}
                   errorText={errors.layout}
                   fullWidth={true}
                   onChange={this.onChange}
                   value={data.layout}/>

                   <TextField
                   inputStyle={input}
                   floatingLabelText="Enter Record ID"
                   name="recordId"
                   errorText={errors.recordId}
                   rows={2}
                   fullWidth={true}
                   onChange={this.onChange}
                   value={data.recordId}/>
                  <div className="button-line">
                    <RaisedButton type="submit" label="Delete Record" fullWidth={true} style={{marginTop:30}} secondary onClick={this.deleteRecord}/>
                  </div>
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
                 <RaisedButton type="submit" label="Get Record" fullWidth={true} style={{marginTop:30}} secondary onClick={this.getRecord}/>
                </div>
                {(this.state.error ? (<Dialog
                  title="Error:"
                  actions={actions}
                  modal={true}
                  open={this.state.error}
                >
                  Record is missing!
                </Dialog>) :
                (this.state.dialog ? (<Dialog
                  title="Data received:"
                  actions={actions}
                  autoScrollBodyContent={true}
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

              <Tab label="Upload picture" >
               <div className="recordMid">
                 {message && <p className="display-message">{message} <br/> New record: {record}</p>}
                 <Dropzone multiple={false} accept="image/*" style={styles.dropzone} onDrop={this.newPicture}>
                   <RaisedButton label="Click to add a picture..." secondary fullWidth={true} />
                 </Dropzone>
                 <div>
                   <Dialog
                     title="New picture"
                     actions={action}
                     modal={false}
                     open={this.state.open}
                     onRequestClose={ this.handleClose }
                     contentStyle={ styles.dialogContent }
                     bodyStyle={ styles.dialogBody }
                     style={ styles.dialogRoot }
                     repositionOnUpdate={ false } >
                     <img src={this.state.preview} width="100%" height="100%" alt=""/>
                   </Dialog>
                 </div>
               </div>
              </Tab>
          </Tabs>
        </div>
    );
  }
};

export default DataApi;
