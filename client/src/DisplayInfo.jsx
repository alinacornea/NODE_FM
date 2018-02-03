import React from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import './Programs.css';


class DisplayInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: ''
    }
  }

  openDatePicker = () => {
    this.refs.dp.openDialog()
  }

  handleDate = (event, date) => {

}

  componentDidMount(){
    let data = this.props.location.state.data;
    this.setState({data: data});
  }

  render() {
    const {data} = this.state;

    return (
      <div>

        <Card className="containerInfo">
          {(data.fieldData ? <h2 className="programName"> {data.fieldData.EventName} </h2> : '')}
          {(data.fieldData ? <h3 className="programType"> {data.fieldData.EventType} <br/><br/>{data.fieldData.EventDate}</h3> : '')}
          <RaisedButton onClick={this.openDatePicker} label="Modify Date" secondary/>
            <DatePicker
              name="eventDate"
              ref='dp'
              onChange={this.handleDate}/>
        </Card>


      </div>
    )
  }
}

export default DisplayInfo;
