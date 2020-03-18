import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Popconfirm, DatePicker } from 'antd';
import { updateEvent, createEvent, deleteEvent } from '../client';
import { isEmpty, momentToString, stringToMoment } from '../util.js';
import { errorNotification, successNotification } from '../Notification';

const tagStyle = {
  color: '#e2231a',
  marginLeft: '12px',
  position: 'absolute',
  left: '27px',
};

const EventForm = (props) => {

  const onDelete = () => {
    deleteEvent(props.eventId)
      .then(() => {
        props.onCancel();
        successNotification('Event Deleted');
        props.onDeleteSuccess();
      })
      .catch(err => { errorNotification('Error') })
  }

  // function onTimeOk(value) {
  //   console.log('onOk: ', value);
  // }

  return (
    <div className='event_form'>
      <Formik
        initialValues={{
          name: props.name,
          time: props.time,
          description: props.description,
        }}
        validate={values => {
          const errors = {};

          if (!values.name) {
            errors.name = 'name required';
          } else if (values.name.length > 100) {
            errors.name = 'name should be shorter than 100 characters';
          }

          if (values.description.length > 3000) {
            errors.description = 'description should be shorter than 3000 characters';
          }

          if (!values.time) {
            errors.time = 'event time required';
          }

          return errors;
        }}
        
        onSubmit={(event, { setSubmitting }) => {
          if (props.eventId) {
            // if the component can receive a eventId, then we are modifying an existing event
            updateEvent({ ...event, userId: props.userId, eventId: props.eventId })
              .then(() => { props.onSuccess(); setSubmitting(false);})
              .catch(err => { props.onFailure(err); setSubmitting(false);})
          } else {
            // else, we are creating a new event
            createEvent({ ...event, userId: props.userId })
            .then(() => { props.onSuccess(); setSubmitting(false);})
            .catch(err => { props.onFailure(err); setSubmitting(false);})
          }
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
          setFieldValue
        }) => {

          const onTimeChange = (obj) => {
            const str = momentToString(obj);
            setFieldValue('time', str);
          }

          const momentObj = stringToMoment(values.time);

          return (
            <form onSubmit={handleSubmit} className='inner_form'>
              <Input
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder='please insert event name'
              />
              {errors.name && touched.name && <span style={{ ...tagStyle, top: '51px' }}>{errors.name}</span>}

              <div className='time_selection'>Event Time: <DatePicker value={momentObj} showTime onChange={onTimeChange} /></div>
              {errors.time && <span style={{ ...tagStyle, top: '100px' }}>{errors.time}</span>}

              <Input.TextArea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder='please insert description'
              />
              {errors.description && touched.description && <span style={{ ...tagStyle, top: '658px', width: '300px' }}>{errors.description}</span>}
            
              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                {props.eventId && 
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
                  disabled={isSubmitting || (isEmpty(touched) && !props.eventId) || !isValid}
                >
                  {props.eventId? 'Update' : 'Save'}
                </Button>
                <Button
                  onClick={() => props.onCancel()}
                  style={{ marginRight: '10px' }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  );
}

export default EventForm;