import React, { Component } from 'react';
import './Programs.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
      info:[]

    }
  }

  componentDidMount() {
    fetch('/filemaker')
      .then(res => res.json())
      .then((res) => {
        console.log(res.data);
        for (var key in res.data) {
            for(var id in res.data[key].portalData.HallBooking){
              let data = res.data[key].portalData.HallBooking[id];
              this.setState({ info: [...this.state.info, data] })
            }
          }
      })
  }

  render() {
    const data = this.state.info;
    return (
        <div className="App">
        <h4>filemaker --> node: {this.state.nodeR} </h4>
        <h3>DATA</h3>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Booking Name</TableHeaderColumn>
                <TableHeaderColumn>Booking Date</TableHeaderColumn>
                <TableHeaderColumn>Expected Guests</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {data.map((item, idx) =>
                    <TableRow key={idx}>
                      <TableRowColumn>{item['HallBooking::BookingName']}</TableRowColumn>
                      <TableRowColumn>{item['HallBooking::Date']}</TableRowColumn>
                      <TableRowColumn>{item['HallBooking::ExpectedGuests']}</TableRowColumn>
                    </TableRow>
                )}
           </TableBody>
        </Table>
      </div>
    );
  }
}

export default Filemaker;
