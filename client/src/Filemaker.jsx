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
        for (var key in res.data) {
            for(var id in res.data[key].portalData.AttendeeSignIn){
              let data = res.data[key].portalData.AttendeeSignIn[id];
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
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Birthday</TableHeaderColumn>
                <TableHeaderColumn>ZipCode</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, idx) =>
                    <TableRow key={idx}>
                      <TableRowColumn>{item['AttendeeSignIn::Name']}</TableRowColumn>
                      <TableRowColumn>{item['AttendeeSignIn::DOB']}</TableRowColumn>
                      <TableRowColumn>{item['AttendeeSignIn::ZipCode']}</TableRowColumn>
                    </TableRow>
                )}
           </TableBody>
        </Table>
      </div>
    );
  }
}

export default Filemaker;
