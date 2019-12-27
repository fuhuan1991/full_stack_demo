import React, { Component } from 'react';
import './main.css';
import NoteManagement from '../noteManagement/index.jsx';



class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render () {
    return (
      <div className='main'>
        <div className='white_font'>works show:</div>
        <p className='white_font'>
          This is a online note management app, you can create, store and modify your notes.<br />
          There is a default account with some existing notes, name: guest, password: 123.<br />
          Made by React + Spring + PostgreSQL + AWS</p>
        <NoteManagement></NoteManagement>
      </div>
    )
  }
}

export default Main;