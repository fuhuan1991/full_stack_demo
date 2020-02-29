import React, { Component } from 'react';
import './main.css';
import NoteManagement from '../noteManagement/index.jsx';
import Game from '../game/Game.jsx';
import { Carousel, Icon } from 'antd';
import gameImg from '../assets/p1.png';
import noteImg from '../assets/p2.png';
import p0 from './img/home_page.png';
import p1 from './img/dashboard.png';
import p2 from './img/data_management.png';
import p3 from './img/graph.png';
import p4 from './img/graph2.png';
import {
  HashRouter as Router,
  Link
} from "react-router-dom";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mouseOverSlide: false,
    };
    this.carousel = React.createRef();
  }

  componentDidMount() {

  }

  next = () => {
    this.carousel.next();
  }
  previous = () => {
    this.carousel.prev();
  }

  sliderEnter = () => {
    this.setState({mouseOverSlide: true});
  }

  sliderLeave = () => {
    this.setState({mouseOverSlide: false});
  }

  render () {
    return (
      <div className='main'>
        <h1 className='white_font' 
          style={{textAlign: 'center', marginTop: '40px'}}>
            Hello, my name is Huan.
        </h1>
        <h1 className='white_font' 
          style={{textAlign: 'center'}}>
            I am a programmer.
        </h1>
        <h1 className='white_font' style={{marginBottom: '0px'}}>ABOUT ME</h1>
        <hr className='line'/>
        <p className='white_font'>
          I am a master’s student in computer science at Tufts and am very passionate in applying
          programing skills to create better experience for users. This semester, I am building a
          mobile attendance system for faculties based on android system.I have 2-year full time 
          working experience as a front-end engineer before joining Tufts
          this year. I have tackled complex technical problems and demonstrated strong programming 
          skills at Lenovo and GrowingIO.
        </p>

        <h1 className='white_font' style={{marginBottom: '0px'}}>PROJECTS</h1>
        <hr className='line'/>

        <h1 className='white_font'>1. GrowingIO.com</h1>
        <div className='slider' onMouseEnter={this.sliderEnter} onMouseLeave={this.sliderLeave}>
          <Carousel ref={node => (this.carousel = node)}>
            <img src={p0}></img>
            <img src={p1}></img>
            <img src={p2}></img>
            <img src={p3}></img>
            <img src={p4}></img>
          </Carousel>
          <div className={this.state.mouseOverSlide? 'arrowLeft' : 'arrowLeft hide'} onClick={this.previous}>
            <Icon type="left" style={{ fontSize: 24, margin: '8px', color: 'white' }}/>
          </div>
          <div className={this.state.mouseOverSlide? 'arrowRight' : 'arrowRight hide'} onClick={this.next}>
            <Icon type="right" style={{ fontSize: 24, margin: '8px', color: 'white' }}/>
          </div>
        </div>
        <h2 className='white_font'>About this project</h2>
        <hr className='line'/>
        <p className='white_font'>
          GrowingIO is a leading analytic platform provider in China. They help customer track data, building 
          dashboard and drive quick insights. I was part of the platform team and our goal is to ensure that 
          users (enterprise user) can manage their data easily.&nbsp;&nbsp;
          <a className='info_link' href='https://www.growingio.com/'>Visit this site</a><br/>
          My role in the team:<br/>
        </p>
          <ul className='list'>
            <li>Designed a new data management module.</li>
            <li>Refactored old react components to improve cohesion</li>
            <li>Developed a react component library for company’s common components.</li>
          </ul>
        <h2 className='white_font' style={{marginBottom: '0px'}}>Technical Sheet</h2>
        <p className='white_font'>Code technologies involved while developing this project.</p>
        <hr className='line'/>
        <ul className='list'>
          <li>React</li>
          <li>Redux</li>
          <li>RxJS</li>
          <li>Node.js</li>
          <li>Javascript ES6 & Typescript</li>
          <li>CSS3 & less</li>
          <li>Webpack</li>
        </ul>



        <h1 className='white_font'>2. Chalkboard Note &nbsp;<Link to="/note">Try it</Link></h1>
        <img src={noteImg}></img>
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
          <li>Spring Scurity</li>
          <li>JWT</li>
          <li>PostgreSQL</li>
          <li>Docker</li>
          <li>AWS</li>
        </ul>




        <h1 className='white_font'>3. Reversi Game &nbsp;<Link to="/game">Try it</Link></h1>
        <img src={gameImg}></img>
        <h2 className='white_font'>About this project</h2>
        <hr className='line'/>
        <p className='white_font'>
          This is a little game like Reversi. Players take turns placing disks on the board 
          with their assigned color facing up. During a play, any disks of the opponent's color
          that are in a straight line and bounded by the disk just placed and another disk of the 
          current player's color are turned over to the current player's color.
          The object of the game is to have the majority of disks turned to display your color when 
          the last playable empty square is filled.&nbsp;&nbsp;
          <a className='info_link' href='https://en.wikipedia.org/wiki/Reversi'>What is Reversi?</a>
        </p>
        <h2 className='white_font' style={{marginBottom: '0px'}}>Technical Sheet</h2>
        <p className='white_font'>Code technologies involved while developing this project.</p>
        <hr className='line'/>
        <ul className='list'>
          <li>React</li>
          <li>Javascript ES6/TypeScript</li>
          <li>CSS3/Sass</li>
        </ul>
      </div>
    )
  }
}

export default Main;