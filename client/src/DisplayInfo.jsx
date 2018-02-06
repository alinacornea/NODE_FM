import React from 'react';
import  axios from 'axios';
//material ui libraries
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import Auth from './Auth';
import './Programs.css';

//style constants
const modify = {
  margin: 0,
  margin:'auto',
  display: 'flex',
  width: '60%'
}

class DisplayInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      errors: {},
      data: '',
      defDate: '',
      recordId: ''
    }
  }

  //open date picker dialog thought a buttom
  openDatePicker = () => {
    this.refs.dp.openDialog()
  }

  modifyDate = (event, date) => {
    //change format date from year/month/date to month/date/year
    let expectedDate = date.getDate();
    let expectedMonth = date.getMonth() + 1;
    //check if date or month is less than 10, if it is add "0"
    if (expectedDate < 10){
      expectedDate = "0" + expectedDate;
    }
    if (expectedMonth < 10){
      expectedMonth = "0" + expectedMonth;
    }
    let tmp  = expectedMonth + "/" + expectedDate + "/" +  date.getFullYear();

    //update record date with the new selected date, sending data to server
    const base = Auth.getBaseInfo();
    const recordId = encodeURIComponent(this.state.recordId);
    const send = {
      base,
      recordId: recordId,
      date: tmp
    }

    axios({
      method: 'post',
      url: '/filemaker-update-date',
      data: send
    }).then(res => {
      console.log(res.data);
      let message = res.data.message;
      if (!res.data.error){
        this.setState({message: message, errors:{}, defDate: tmp })
      }
      else{
        let errors = res.data.errors;
        this.setState({errors, message: message});
      }
      //close the message displayed
      setInterval(() => {
        this.setState({errors:{}, message: ''})
      }, 6000);
    }).catch(err => {
      console.log(err);
    });
  }


  componentDidMount(){
    let data = this.props.location.state.data;
    let recId = data.recordId;
    const defDate = data.fieldData ? (data.fieldData.EventDate) : '';
    this.setState({data: data, defDate: defDate, recordId: recId});
  }

  render() {
    const { message, data, defDate, errors } = this.state;
    return (
      <div>
        <Card className="containerInfo">
        {message && <p className="display-message">{message}</p>}
          {(data.fieldData ? <h2 className="programName"> {data.fieldData.EventName} </h2> : '')}
          {(data.fieldData ? <h3 className="programType"> {data.fieldData.EventType} </h3> : '')}
          {(data.fieldData ? <h3 className="programType"> {defDate} </h3> : '')}
          <DatePicker
            ref="dp"
            mode="landscape"
            name="eventDate"
            value={errors}
            onChange={this.modifyDate}/>
          <RaisedButton style={modify} onClick={this.openDatePicker} label="Pick & Modify Date" secondary/>
        </Card>
      </div>
    )
  }
}

export default DisplayInfo;
