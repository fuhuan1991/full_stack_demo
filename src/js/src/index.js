import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css';
import NoteManagement from './noteManagement/index';

ReactDOM.render(<div className='main'><NoteManagement /></div>, document.getElementById('root'));

document.title = 'Note';
