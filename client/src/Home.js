import React , { Component } from 'react';
import Auth from './Auth';
import  axios from 'axios';
import './Programs.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Lock from 'material-ui/svg-icons/action/lock';
import Account from 'material-ui/svg-icons/action/account-box';

const input = {
   WebkitBoxShadow: '0 0 0 1000px lightgrey inset'
}
const margin ={
  marginLeft:20
}

class Home extends Component {

  constructor(props) {
    super(props);
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      data: {
        user: '',
        password: '',
        solution: '',
        layout:''
      }
    };
  }


  processForm = (event) => {
    event.preventDefault();

    const user = encodeURIComponent(this.state.data.user);
    const password = encodeURIComponent(this.state.data.password);
    const solution = encodeURIComponent(this.state.data.solution);
    const layout = encodeURIComponent(this.state.data.layout);

    const formData = `user=${user}&password=${password}&solution=${solution}&layout=${layout}`;

    axios({
      method: 'post',
      url: '/filemaker-login',
      data: formData
    }).then(res => {
        this.setState({errors: {}
      });
      Auth.authenticateUser(res.token);
      this.props.toggleAuthenticateStatus();
      this.props.history.push('/dataapi');
    }).catch(err => {
      console.log(err);
    })
  }

  changeData = (event) => {

    const field = event.target.name;
    const data = this.state.data;
    data[field] = event.target.value;

    this.setState({
      data
    });
  }

  render() {
    const {data, errors, successMessage} = this.state;

    return (

      <div className="login">
      <h2 className="card-heading">Authenticate with FM Solution</h2>
        <form action="" onSubmit={this.processForm}>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <Account/>
          <div className="field-line">
            <TextField
              inputStyle={input}
              floatingLabelText="Enter User"
              name="user"
              fullWidth={true}
              style={margin}
              errorText={errors.user}
              onChange={this.changeData}
              value={data.user}
            />
          </div>

          <Lock/>
          <div className="field-line">
            <TextField
              floatingLabelText="Enter Password"
              type="password"
              name="password"
              fullWidth={true}
              inputStyle={input}
              style={margin}
              onChange={this.changeData}
              errorText={errors.password}
              value={data.password}
            />
          </div>
          <Lock/>
          <div className="field-line">
            <TextField
              floatingLabelText="Enter FM Solution"
              name="solution"
              fullWidth={true}
              inputStyle={input}
              style={margin}
              onChange={this.changeData}
              errorText={errors.solution}
              value={data.solution}
            />
          </div>
          <Lock/>
          <div className="field-line">
            <TextField
              floatingLabelText="Enter Layout"
              name="layout"
              fullWidth={true}
              inputStyle={input}
              style={margin}
              onChange={this.changeData}
              errorText={errors.layout}
              value={data.layout}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Authenticate" fullWidth={true} style={{marginTop:30, height:60}} primary />
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
