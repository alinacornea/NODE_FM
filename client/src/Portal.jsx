import React, { Component } from 'react';
import axios from 'axios';
import Auth from './Auth';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './Programs.css';

class Portal extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: []
    }
  }

  componentDidMount() {
    const base = Auth.getBaseInfo();
    const {match : {params } } = this.props;
    axios({
      method: 'POST',
      url: `/portal/${params.recordId}`,
      data: base
    }).then((res) => {
      for (var key in res.data) {
          for(var id in res.data[key].portalData.AttendeeSignIn){
            let data = res.data[key].portalData.AttendeeSignIn[id];
            this.setState({ info: [...this.state.info, data] })
          }
        }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { info } = this.state;
    return (
      <div>
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
       </div>
    );
  }

}


export default Portal;
