import React, { Component } from 'react';
import './index.css';
// import {  } from 'antd';
import LoginForm from './LoginForm';
import { successNotification, errorNotification} from '../Notification';
import SignupForm from './SignupForm';
import Desktop from './Desktop';

class NoteManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStage: 'LOGIN',
      userId: '',
    };
  }

  componentDidMount() {

  }

  onLoginSucc = (o) => {
    o.json().then((userInfo) => {
      console.log(userInfo)
      this.setState({ userId: userInfo.userId });
      successNotification('Login successful', 'Welcom back');
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
    errorNotification('Sign up failed', e.error.message);
  }

  switchToStage = nextStage => () => {
    this.setState({
      currentStage: nextStage,
    });
  }

  onLogout = () => {
    this.setState({
      currentStage: 'LOGIN',
      userId: '',
    });
  }

  render() {
    return (
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
    )
  }
}

export default NoteManagement;