import React, { Component } from 'react';
// import { BrowserRouter as Router,  Route, Link, Redirect} from 'react-router-dom';
import './Programs.css';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Programs extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('/programs')
      .then(res => res.json())
      .then((res) => {this.setState({ data: res })
      })
  }


  render() {
    return (
        <div>
        <Table>
          <h1>Program Names</h1>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Event Name</TableHeaderColumn>
                <TableHeaderColumn>Event Type</TableHeaderColumn>
                <TableHeaderColumn>Event Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
             {this.state.data.map((item, idx) =>
                    <TableRow key={idx}>
                      <TableRowColumn>{item.fieldData.EventName}</TableRowColumn>
                      <TableRowColumn>{item.fieldData.EventType}</TableRowColumn>
                      <TableRowColumn>{item.fieldData.EventDate}</TableRowColumn>
                    </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
    );
  }
}

export default Programs;
