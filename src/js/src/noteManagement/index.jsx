import React, { Component } from 'react';
import './style/index.scss';
import LoginForm from './LoginForm';
import { successNotification, errorNotification } from '../Notification';
import SignupForm from './SignupForm';
import Desktop from './Desktop';
import {
  Link
} from "react-router-dom";
import { getCookie } from '../util.js';
import { checkToken } from '../client.js';

class NoteManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStage: 'LOGIN',
      userId: '',
    };
  }

  componentDidMount() {
    const jwt = getCookie('jwt_token');
    const userName = getCookie('user_name');
    const userId = getCookie('user_id');

    if (jwt && userName && userId) {

      checkToken(userName, jwt)
      .then(() => {
        this.setState({ userId: userId });
        successNotification('Login successful', 'Welcom back ' + userName);
        this.switchToStage('DESKTOP')();
      })
      .catch(err => { this.onLogout() });
    }
  }

  onLoginSucc = (o) => {
    o.json().then((userInfo) => {

      // store user info as cookie
      document.cookie = `jwt_token=${userInfo.jwt}`;
      document.cookie = `user_name=${userInfo.name}`;
      document.cookie = `user_id=${userInfo.userId}`;

      this.setState({ userId: userInfo.userId });
      successNotification('Login successful', 'Welcom back' + userInfo.name);
      this.switchToStage('DESKTOP')();
    })
    .catch(() => {errorNotification('Login failed', 'invalid user')});
  }

  onLoginFail = (e) => {
    errorNotification('Login failed', e.error.message);
  }

  onSignupSucc = () => {
    successNotification('Sign up successful', 'Please log in');
    this.switchToStage('LOGIN')();
  }

  onSignupFail = (e) => {
    console.log(e,e.error)
    errorNotification('Sign up failed', e.error.message);
  }

  switchToStage = nextStage => () => {
    this.setState({
      currentStage: nextStage,
    });
  }

  onLogout = () => {
    // remove all the cookies
    document.cookie = "jwt_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    this.setState({
      currentStage: 'LOGIN',
      userId: '',
    });
  }

  render() {
    return (
      <React.Fragment>
        <Link style={{fontSize: '24px', margin: '10px'}} to="/">Back</Link>
        <div className='note_management'>
          {this.state.currentStage === 'LOGIN' 
            && 
            <LoginForm 
              onSuccess={this.onLoginSucc} 
              onFailure={this.onLoginFail}
              OnSitchToSignup={this.switchToStage('SIGNUP')}
            />}

          {this.state.currentStage === 'SIGNUP' 
            && 
            <SignupForm 
              onSuccess={this.onSignupSucc} 
              onFailure={this.onSignupFail}
              OnSitchToLogin={this.switchToStage('LOGIN')}
            />}
          {this.state.currentStage === 'DESKTOP'
          &&
          <Desktop 
            userId={this.state.userId}
            onLogout={this.onLogout}
          />}
        </div>
      </React.Fragment>
    )
  }
}

export default NoteManagement;