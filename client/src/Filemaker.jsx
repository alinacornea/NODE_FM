import React, { Component } from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Programs.css';
import Auth from './Auth';
//style constants
const input = {
   WebkitBoxShadow: '0 0 0 1000px lightgrey inset'
}

const dialog = {
  height:'35%',
  position: 'fixed',
  top: '-250px'
}

class Filemaker extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      message: '',
      errors: {},
      error: '',
      data: [],
      recordId: '',
      func: '',
      result: []
    }

  }

  handleClose = () => {
    this.setState({open: false})
  }

  setRecord = () => {
    if(this.state.recordId){
      let base = Auth.getBaseInfo();
      let send = {
        base,
        recordId: this.state.recordId
      }

      axios({
        method: 'POST',
        url: '/getvalue',
        data: send
      }).then((res) => {
        if (!res.data.error){
          let data = [];
          data = res.data.data[0].fieldData.SendNODE.split('\r');
          let result = res.data.result;
          let func = res.data.func;
          this.setState({ data: data, result: result, func: func, open: false})
        }
        else{
          let errors = res.data.errors;
          let message = res.data.message;
          this.setState({errors, message: message});
        }
        setInterval(() => {
          this.setState({message: ''})
        }, 6000);

      }).catch(err => {
        this.setState({ error: true });
      });
    }
    else{
      const errors = {
        recordId: 'Please enter a Record ID!'
      }
      this.setState({errors})
    }
  }


  componentDidMount() {
    this.setState({open: true});
  }

  onChange = (event, value) => {
    this.setState({
      recordId: event.target.value
    });
  }

  render() {
    const { data, recordId, errors, message, result, func } = this.state;
    return (
        <div className="App">
        {(this.state.open ? (<Dialog
          style={dialog}
          repositionOnUpdate={true}
          modal={true}
          open={this.state.open}
        >
        {message && <p className="error-message">{message}</p>}
        <TextField
          inputStyle={input}
          floatingLabelText="Enter Record ID"
          name="recordId"
          style={{fontSize: '30px'}}
          errorText={errors.recordId}
          onChange={this.onChange}
          rows={2}
          fullWidth={true}
          value={recordId}/>
         <div className="button-line">
           <RaisedButton type="submit" label="Cancel" style={{marginTop:40,width:'48%', }}  primary onClick={this.handleClose}/>
           <RaisedButton type="submit" label="Submit" style={{marginTop:40, width:'48%', float: 'right'}} primary onClick={this.setRecord}/>
         </div>
        </Dialog>) : ''
      )}
        <div className="getData">
          <h3 className="programsName">Get Data: </h3>
          {(data ? data.map((item, idx) => <p key={idx}>{item}</p>) : '')}
        </div>
        <div className="resultData">
          <h3 className="programsName">{func} -> result Data: </h3>
          {(result ? result.map((item, idx) => <p key={idx}>{item}</p>) : '')}
        </div>
      </div>
    );
  }
}

export default Filemaker;
