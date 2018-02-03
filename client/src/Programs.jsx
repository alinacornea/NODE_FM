import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './Programs.css';

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
    fetch('/programs')
      .then(res => res.json())
      .then((res) => {this.setState({ data: res })
      })
  }

  // handleClose = () => {
  //   this.setState({dialog:false})
  // }

  seeDetails = (row, col, event) => {
    let data = this.state.data[row];
    this.props.history.push({pathname: '/program-info', state: { data: data}});
  }

  render() {
    const { data} = this.state;
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


// const actions = [
//   <FlatButton
//     label="OK"
//     primary={true}
//     onClick={this.handleClose}
//   />
// ];
