import React, { Component } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './Programs.css';
import Auth from './Auth';

//style constants
const style = {
  fontSize: 10
}

class Programs extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const base = Auth.getBaseInfo();
    const layout = encodeURIComponent('AllProgramsEvents');
    const send = {
      base,
      layout: layout
    }
    axios({
      method: 'POST',
      url: '/programs',
      data: send
    }).then((res) => {
        let data = res.data;
        this.setState({ data: data })
    }).catch(err => {
      const data = this.state.data;
      data['layout'] = '';
      data['recordId'] = '';
      this.setState({data, error: true});
    });
  }

  seeDetails = (row) => {
    let data = this.state.data[row];
    this.props.history.push({pathname: '/program-info', state: { data: data}});
  }

  render() {
    const { data } = this.state;
    return (
      <div>
      <h3 className="programsName">Programs Events</h3>
        <Table onCellClick={this.seeDetails} selectable={true} multiSelectable>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Record Id</TableHeaderColumn>
                <TableHeaderColumn>Program Name</TableHeaderColumn>
                <TableHeaderColumn>Event Name</TableHeaderColumn>
                <TableHeaderColumn>Event Type</TableHeaderColumn>
                <TableHeaderColumn>Event Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
             {data.map((item, idx) =>
                    <TableRow key={idx}>
                      <TableRowColumn style={style}> {item.recordId} </TableRowColumn>
                      <TableRowColumn>{item.fieldData['Program::ProgramName']}</TableRowColumn>
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
