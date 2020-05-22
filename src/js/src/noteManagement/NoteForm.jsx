import React from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import { Input, Button, Popconfirm } from 'antd';
import { updateNote, createNote, deleteNote } from '../client';
import { isEmpty } from '../util.js';
import { errorNotification, successNotification } from '../Notification';

const tagStyle = { 
  color: '#e2231a', 
  marginLeft: '12px',
  position: 'absolute',
  left: '27px',
};


const NoteForm = (props) => {

  const onDelete = () => {
    deleteNote(props.noteId)
      .then(() => { 
        props.onCancel();
        successNotification('Note Deleted');
        props.onDeleteSuccess();
      })
      .catch(err => { errorNotification('Error') })
  }

  const [fontSize, setFontSize] = useState(17);

  const inc = () => {
    if (fontSize < 36) {
      setFontSize(fontSize+1);
    }
  }

  const dec = () => {
    if (fontSize > 10) {
      setFontSize(fontSize-1);
    }
  }

  const reset = () => {
    setFontSize(17);
  }

  return (
    <div className='note_form'>
      <Formik
        initialValues={{
          title: props.title,
          description: props.description,
        }}
        validate={values => {
          const errors = {};

          if (!values.title) {
            errors.title = 'title required';
          } else if (values.title.length > 280) {
            errors.title = 'title should be shorter than 280 characters';
          }

          if (!values.description) {
            errors.description = 'description required';
          } else if (values.description.length > 11500) {
            errors.description = 'description should be shorter than 11500 characters';
          }

          return errors;
        }}
        onSubmit={(note, { setSubmitting }) => {
          if (props.noteId) {
            // if the component can receive a noteId, then we are modifying an existing note
            updateNote({ ...note, userId: props.userId, noteId: props.noteId })
              .then(() => { props.onSuccess(); setSubmitting(false);})
              .catch(err => { props.onFailure(err); setSubmitting(false);})
          } else {
            // else, we are creating a new note
            createNote({ ...note, userId: props.userId })
            .then(() => { props.onSuccess(); setSubmitting(false);})
            .catch(err => { props.onFailure(err); setSubmitting(false);})
          }
          
            // .finally(() => { setSubmitting(false); });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitForm,
          isValid,
        }) => (
            <form onSubmit={handleSubmit} className='inner_form'>
              <Input
                // style={inputStyle}
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder='please insert title'
              />
              {errors.title && touched.title && <span style={{ ...tagStyle, top: '51px' }}>{errors.title}</span>}
              <Input.TextArea
                // style={inputStyle}
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder='please insert description'
                style={{fontSize: fontSize + 'px'}}
              />
              {errors.description && touched.description && <span style={{ ...tagStyle, top: '658px', width: '300px' }}>{errors.description}</span>}
              
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                {props.noteId && 
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={onDelete}>
                  <Button
                    type='danger'
                    onClick={() => {}}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                </Popconfirm>}
                <Button
                  onClick={() => submitForm()}
                  type="primary"
                  style={{ marginRight: '10px' }}
                  disabled={isSubmitting || (isEmpty(touched) && !props.noteId) || !isValid}
                >
                  {props.noteId? 'Update' : 'Save'}
                </Button>
                <Button
                  onClick={() => props.onCancel()}
                  style={{ marginRight: '10px' }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
      </Formik>
      <Button onClick={dec} className="font-btn dec">-</Button>
      <Button onClick={reset} className="font-btn reset">reset</Button>
      <Button type="primary" onClick={inc} className="font-btn inc">+</Button>
    </div>
  );
}

export default NoteForm;