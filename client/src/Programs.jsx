import React, { Component } from 'react';
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

import './Programs.css';
const style = {
  fontSize: 10
}

class Programs extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      dialog: false,
      row: ''
    }
  }

  componentDidMount() {
    fetch('/programs')
      .then(res => res.json())
      .then((res) => {this.setState({ data: res })
      })
  }
  handleClose = () => {
    this.setState({dialog:false})
  }

  seeDetails = (row, col, event) => {
    console.log(row);
    console.log(this.state.data[row]);
    console.log(this.props);
    console.log(event.target.innerHTML)
    this.setState({dialog: true})
  }

  render() {
    // console.log(this.state.data);
    const { data, dialog} = this.state;

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />
    ];
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
                    <TableRow key={idx} rowNumber={parseInt(item.recordId, 10)}>
                      <TableRowColumn style={style}> {item.recordId} </TableRowColumn>
                      <TableRowColumn>{item.fieldData['Program::ProgramName']}</TableRowColumn>
                      <TableRowColumn>{item.fieldData.EventName}</TableRowColumn>
                      <TableRowColumn>{item.fieldData.EventType}</TableRowColumn>
                      <TableRowColumn>{item.fieldData.EventDate}</TableRowColumn>
                    </TableRow>
              )}
              </TableBody>
          </Table>
          {(dialog ?   <Dialog
              title="Error:"
              actions={actions}
              modal={true}
              open={this.state.dialog}
            >
              Record is missing! {this.state.row}
            </Dialog> : '')}
      </div>
    );
  }
}


export default Programs;
