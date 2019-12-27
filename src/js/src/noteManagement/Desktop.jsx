import React, { Component } from 'react';
import './desktop.css';
import { getUserNotes } from '../client';
import { errorNotification, successNotification } from '../Notification';
import { Empty, Modal, Button, Icon } from 'antd';
import NoteForm from './NoteForm';


class Desktop extends Component {
  constructor(props) {
    console.log('desktop created')
    super(props);
    this.state = {
      noteArray: [],
      detailView: false,
      targetNote: null
    };
  }

  componentDidMount() {
    this.fetchAllNotes(this.props.userId);
  }

  fetchAllNotes = (userId) => {
    getUserNotes(userId)
    .then((res) => {
      return res.json();
    })
    .then((noteArray) => {
      console.log(noteArray);
      this.setState({ noteArray });
    })
    .catch(err => { errorNotification('error', err.error.message) });
  }

  renderNoteArray = (noteArray) => {
    if (noteArray.length === 0) {
      return <Empty description='No notes' />
    } else {
      return noteArray.map((note) => {
        return (
          <div 
            note_id={note.noteId} 
            key={note.noteId} 
            onClick={this.openDetailView.bind(this, note.noteId)}
            className='note_cell'
          >
            <div className='title'>{note.title}</div>
            <div className='description'>{note.description}</div>
          </div>
        )
      });
    }
  }

  openDetailView = (noteId) => {
    const target = this.getNoteInfoById(this.state.noteArray, noteId);
    if (target) {
      this.setState({
        detailView: true,
        targetNote: target
      });
    } else {
      console.log('can not get note with id ' + noteId);
    }
  }

  getNoteInfoById = (noteArray, noteId) => {
    const target = noteArray.filter(o => o.noteId === noteId);
    if (target.length > 0) return target[0];
    return null;
  }

  onAddNewNote = () => {
    this.setState({
      target: null,
      targetNote: null,
      detailView: true,
    });
  }

  render() {
    const notes = this.renderNoteArray(this.state.noteArray);

    return (
      <div className='desktop'>
        <Modal
          visible={this.state.detailView}
          footer={null}
          closable={false}
          width={600}
          wrapClassName='node_modal'
        >
          <NoteForm 
            key={Math.random()}
            title={this.state.targetNote ? this.state.targetNote.title : ''}
            description={this.state.targetNote ? this.state.targetNote.description : ''}
            userId={this.props.userId}
            noteId={this.state.targetNote ? this.state.targetNote.noteId : ''}
            onSuccess={() => {
              this.fetchAllNotes(this.props.userId);
              successNotification('Note updated');
              this.setState({
                detailView: false,
                targetNote: null
              });
            }}
            onFailure={(error) => {
              errorNotification('Error')
            }}
            onCancel={() => {
              this.setState({
                detailView: false,
                targetNote: null
              });
            }}
          />
        </Modal>
        <h1 className='big_title'>Notes</h1>
        <Button type='primary' onClick={() => this.onAddNewNote()}><Icon type="plus-circle" />Add new note</Button>
        <div className='note_container'>{notes}</div>
        <Button type='primary' onClick={() => this.props.onLogout()}><Icon type="left" />log out</Button>
      </div>
    );
  }

}
export default Desktop;