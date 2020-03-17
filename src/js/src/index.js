import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import Main from './main/Main';
import Game from './game/Game.tsx';
import NoteManagement from './noteManagement/index';
// import * as serviceWorker from './serviceWorker';
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const Root = 
    <Router>
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route path="/game">
                <Game />
            </Route>
            <Route path="/note">
                <NoteManagement />
            </Route>
        </Switch>
    </Router>;

ReactDOM.render(Root, document.getElementById('root'));

document.title = 'My Website';
