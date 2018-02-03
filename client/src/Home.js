import React , { Component } from 'react';
import Auth from './Auth';
import  axios from 'axios';
import './Programs.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import Lock from 'material-ui/svg-icons/action/lock';
// import Account from 'material-ui/svg-icons/action/account-box';

const input = {
   WebkitBoxShadow: '0 0 0 1000px lightgrey inset'
}
const margin ={
  marginLeft:20
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      message: '',
      data: {
        user: '',
        password: '',
        solution: '',
        layout:'',
        server: ''
      }
    };
  }


  processForm = (event) => {
    event.preventDefault();

    const user = encodeURIComponent(this.state.data.user);
    const password = encodeURIComponent(this.state.data.password);
    const server = encodeURIComponent(this.state.data.server);
    const solution = encodeURIComponent(this.state.data.solution);
    const layout = encodeURIComponent(this.state.data.layout);

    const formData = `user=${user}&password=${password}&server=${server}&solution=${solution}&layout=${layout}`;

    axios({
      method: 'post',
      url: '/filemaker-login',
      data: formData
    }).then(res => {
      if (!res.data.error){
        Auth.authenticateUser(res.data.token);
        Auth.setInfo(solution, layout, server);
        this.props.toggleAuthenticateStatus();
        this.props.history.push('/dataapi');
      }
      else{
        const errors = res.data.errors;
        const message = res.data.message;
        this.setState({errors, message: message});
      }

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
    const {data, errors, message} = this.state;

    return (

      <div className="login">
      <h2 className="card-heading">Authenticate with FM Solution</h2>
        <form action="" onSubmit={this.processForm}>

          {message && <p className="error-message">{message}</p>}
          <div className="field-line">
            <TextField
              floatingLabelText="Enter Server Web Address"
              name="server"
              fullWidth={true}
              inputStyle={input}
              style={margin}
              onChange={this.changeData}
              errorText={errors.server}
              value={data.server}
            />
          </div>
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

          <div className="button-line">
            <RaisedButton type="submit" label="Authenticate" fullWidth={true} style={{marginTop:30, height:60}} primary />
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
