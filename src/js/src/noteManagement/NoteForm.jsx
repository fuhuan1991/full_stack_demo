import React from 'react';
import { Formik } from 'formik';
import { Input, Button } from 'antd';
import { updateNote, createNote } from '../client';
import { isEmpty } from '../util.js';

const tagStyle = { 
  color: '#e2231a', 
  marginLeft: '12px',
  position: 'absolute',
  top: '51px',
  width: '200px',
  left: '27px',
};


const NoteForm = (props) => {
  return (
    <div className='node_form'>
      <Formik
        initialValues={{
          title: props.title,
          description: props.description,
        }}
        validate={values => {
          const errors = {};

          if (!values.title) {
            errors.title = 'title required';
          }

          if (!values.description) {
            errors.description = 'description required';
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
              {errors.title && touched.title && <span style={tagStyle}>{errors.title}</span>}
              <Input.TextArea
                // style={inputStyle}
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder='please insert description'
              />
              {errors.description && touched.description && <span style={tagStyle}>{errors.description}</span>}
              <div>
                <Button
                  onClick={() => submitForm()}
                  type="primary"
                  style={{ marginRight: '10px', marginLeft: '380px'}}
                  disabled={isSubmitting || (isEmpty(touched) && !props.noteId) || !isValid}
                >
                  {props.noteId? 'Update' : 'Save'}
                </Button>
                <Button
                  onClick={() => props.onCancel()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
      </Formik>
    </div>
  );
}

export default NoteForm;