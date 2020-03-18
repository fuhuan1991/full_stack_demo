import React, { Component } from 'react';
import './style/desktop.scss';
import { getUserNotes, getUserEvents } from '../client';
import { errorNotification, successNotification } from '../Notification';
import { Modal, Button, Icon } from 'antd';
import NoteForm from './NoteForm';
import EventForm from './EventForm';
import Meter from './Meter';
import { getCookie, compareTimeString } from '../util.js';

class Desktop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteArray: [],
      eventArray: [],
      detailNoteView: false,
      detailEventView: false,
      targetNote: null,
      targetEvent: null,
    };
  }

  componentDidMount() {
    this.fetchAllNotes(this.props.userId);
    this.fetchAllEvents(this.props.userId);
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

  fetchAllEvents = (userId) => {
    getUserEvents(userId)
    .then((res) => {
      return res.json();
    })
    .then((eventArray) => {
      console.log(eventArray);
      this.setState({ eventArray });
    })
    .catch(err => { errorNotification('error', err.error.message) });
  }

  renderNoteArray = (noteArray) => {
    if (noteArray.length === 0) {
      return <span className='chalkboard_font empty_msg'>No Notes</span>
    } else {
      return noteArray.map((note) => {
        return (
          <div 
            note_id={note.noteId} 
            key={note.noteId} 
            onClick={this.openDetailNoteView.bind(this, note.noteId)}
            className='note_cell'
          >
            <div className='title'>{note.title}</div>
            <div className='description'>{note.description}</div>
          </div>
        )
      });
    }
  }

  openDetailNoteView = (noteId) => {
    const target = this.getNoteInfoById(this.state.noteArray, noteId);
    if (target) {
      this.setState({
        detailNoteView: true,
        targetNote: target
      });
    } else {
      console.log('can not get note with id ' + noteId);
    }
  }

  openDetailEventView = (eventId) => {
    const target = this.getEventInfoById(this.state.eventArray, eventId);
    if (target) {
      this.setState({
        detailEventView: true,
        targetEvent: target
      });
    } else {
      console.log('can not get event with id ' + eventId);
    }
  }

  getNoteInfoById = (noteArray, noteId) => {
    const target = noteArray.filter(o => o.noteId === noteId);
    if (target.length > 0) return target[0];
    return null;
  }

  getEventInfoById = (eventArray, eventId) => {
    const target = eventArray.filter(o => o.eventId === eventId);
    if (target.length > 0) return target[0];
    return null;
  }

  onAddNewNote = () => {
    this.setState({
      target: null,
      targetNote: null,
      detailNoteView: true,
    });
  }

  onAddNewEvent = () => {
    this.setState({
      target: null,
      targetEvent: null,
      detailEventView: true,
    });
  }

  renderEventArray = (eventArray) => {
    if (eventArray.length === 0) {
      return <span className='chalkboard_font empty_msg'>No Events</span>
    } else {
      eventArray.sort(compareTimeString);
      return eventArray.map((event) => {
        return (
          <div 
            event_id={event.eventId} 
            key={event.eventId} 
            onClick={this.openDetailEventView.bind(this, event.eventId)}
            className='event_cell'
          >
            <div className='name'>{event.name}</div>
            <div>{event.time}</div>
            {/* <div className='description'>{event.description}</div> */}
          </div>
        )
      });
    }
  }

  render() {
    const notes = this.renderNoteArray(this.state.noteArray);
    const events = this.renderEventArray(this.state.eventArray);
    const userName = getCookie('user_name');

    return (
      <div className='desktop'>
        <h1 className='big_title'>Hello, {userName}</h1>
        <Button type='primary' onClick={() => this.props.onLogout()}><Icon type="left" />log out</Button>

        <h1 className='big_title'>Notes</h1>
        <Button type='primary' onClick={() => this.onAddNewNote()}><Icon type="plus-circle" />Add New Note</Button>
        <div className='note_container'>{notes}</div>


        <h1 className='big_title'>Events</h1>
        <Button type='primary' onClick={() => this.onAddNewEvent()}><Icon type="plus-circle" />Add New Event</Button>
        <Meter eventArray={this.state.eventArray} range={30}></Meter>
        <div className='note_container'>{events}</div>

        {/* note Modal */}
        <Modal
          visible={this.state.detailNoteView}
          footer={null}
          closable={false}
          width={600}
          wrapClassName='note_modal'
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
                detailNoteView: false,
                targetNote: null
              });
            }}
            onFailure={(error) => {
              errorNotification('Error')
            }}
            onDeleteSuccess={() => {
              this.fetchAllNotes(this.props.userId);
              this.setState({
                detailNoteView: false,
                targetNote: null
              });
            }}
            onCancel={() => {
              this.setState({
                detailNoteView: false,
                targetNote: null
              });
            }}
          />
        </Modal>


        {/* event Modal */}
        <Modal
          visible={this.state.detailEventView}
          footer={null}
          closable={false}
          width={600}
          wrapClassName='event_modal'
        >
          <EventForm
            key={Math.random()}
            name={this.state.targetEvent ? this.state.targetEvent.name : ''}
            time={this.state.targetEvent ? this.state.targetEvent.time : ''}
            description={this.state.targetEvent ? this.state.targetEvent.description : ''}
            userId={this.props.userId}
            eventId={this.state.targetEvent ? this.state.targetEvent.eventId : ''}
            onSuccess={() => {
              this.fetchAllEvents(this.props.userId);
              successNotification('Event updated');
              this.setState({
                detailEventView: false,
                targetEvent: null
              });
            }}
            onFailure={(error) => {
              errorNotification('Error')
            }}
            onDeleteSuccess={() => {
              this.fetchAllEvents(this.props.userId);
              this.setState({
                detailEventView: false,
                targetEvent: null
              });
            }}
            onCancel={() => {
              this.setState({
                detailEventView: false,
                targetEvent: null
              });
            }}
          />
        </Modal>
      </div>
    );
  }

}
export default Desktop;