import React from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';
import RaisedButton from 'material-ui/RaisedButton';

const logout ={
  marginTop: '10%',
  width:'60%',
  display: 'center',
  height: 100
}
class LogoutPage extends React.Component {

  handleLogout = () =>  {
    Auth.deauthenticateUser();
    window.location.reload()
  }

  render() {
    return (
      <div align="center">
        <RaisedButton type="submit" label="Logout" style={logout} primary onClick={this.handleLogout}/>
      </div>
    )
  }
}

LogoutPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LogoutPage;
