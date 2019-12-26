import React, { Component } from 'react';
import './main.css';
import { Tabs } from 'antd';
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
        <div className='tab'>
          <Tabs defaultActiveKey="1" >
            <Tabs.TabPane tab="Tab 1" key="1">
              <NoteManagement></NoteManagement>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Main;