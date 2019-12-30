import React, { Component } from 'react';
import './main.css';
import NoteManagement from '../noteManagement/index.jsx';
import Game from '../game/Game.jsx';


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
        <h1 className='white_font'>1. Chalkboard Note</h1>
        <NoteManagement></NoteManagement>
        <h2 className='white_font'>About this project</h2>
        <hr className='line'/>
        <p className='white_font'>
          This is a online note management app, you can create, store and modify your notes.<br />
          There is a default account with some existing notes, name: guest, password: 123.<br />
        </p>
        <h2 className='white_font' style={{marginBottom: '0px'}}>Technical Sheet</h2>
        <p className='white_font'>Code technologies involved while developing this project.</p>
        <hr className='line'/>
        <ul className='list'>
          <li>React</li>
          <li>Javascript ES6</li>
          <li>CSS3</li>
          <li>Spring Boot</li>
          <li>PostgreSQL</li>
          <li>Docker</li>
          <li>AWS</li>
        </ul>

        <h1 className='white_font'>2. Reversi Game</h1>
        <Game></Game>
        <h2 className='white_font'>About this project</h2>
        <hr className='line'/>
        <p className='white_font'>
          This is a little game like Reversi. Players take turns placing disks on the board 
          with their assigned color facing up. During a play, any disks of the opponent's color
          that are in a straight line and bounded by the disk just placed and another disk of the 
          current player's color are turned over to the current player's color.
          The object of the game is to have the majority of disks turned to display your color when 
          the last playable empty square is filled.&nbsp;&nbsp;
          <a className='info_link' href='https://en.wikipedia.org/wiki/Reversi'>(Reversi)</a>
        </p>
        <h2 className='white_font' style={{marginBottom: '0px'}}>Technical Sheet</h2>
        <p className='white_font'>Code technologies involved while developing this project.</p>
        <hr className='line'/>
        <ul className='list'>
          <li>React</li>
          <li>Javascript ES6</li>
          <li>CSS3</li>
        </ul>
      </div>
    )
  }
}

export default Main;