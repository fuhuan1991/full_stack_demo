import React, { Component } from 'react';
import './index.css';
// import {  } from 'antd';
import LoginForm from './LoginForm';
import { successNotification, errorNotification} from '../Notification';
import SignupForm from './SignupForm';


class NoteManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStage: 'LOGIN',
    };
  }

  componentDidMount() {

  }

  onLoginSucc = () => {
    successNotification('Login successful', 'Welcom back');
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

  render() {
    return (
      <div className='note_management'>
        {this.state.currentStage === 'LOGIN' 
          && 
          <LoginForm 
            onSucess={this.onLoginSucc} 
            onFailure={this.onLoginFail}
            OnSitchToSignup={this.switchToStage('SIGNUP')}
          />}

        {this.state.currentStage === 'SIGNUP' 
          && 
          <SignupForm 
            onSucess={this.onSignupSucc} 
            onFailure={this.onSignupFail}
            OnSitchToLogin={this.switchToStage('LOGIN')}
          />}
      </div>
    )
  }
}

export default NoteManagement;