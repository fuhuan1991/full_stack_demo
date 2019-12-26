import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from '../client'

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin}
const isEmpty = (obj) => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

const AddStudentFrom = (props) => {
  return (
    <Formik
      initialValues={{ 
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
      }}
      validate={values => {
        const errors = {};

        if (!values.email) {
          errors.email = 'email equired';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.firstName) {
          errors.firstName = 'first name required';
        }

        if (!values.lastName) {
          errors.lastName = 'last name required';
        }

        if (!values.gender) {
          errors.gender = 'gender required';
        } else if (!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
          errors.gender = 'invalid gender';
        }

        return errors;
      }}
      onSubmit={(student, { setSubmitting }) => {
        student.gender = student.gender.toUpperCase();
        addNewStudent(student).then(() => {
          props.onSuccess();
        })
        .catch(err => {
          props.onFailure(err);
        })
        .finally(() => {
          setSubmitting(false);
        })
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
        <form onSubmit={handleSubmit}>
          <Input
            style={inputBottomMargin}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder='First name, E.G John'
          />
          {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
          <Input
            style={inputBottomMargin}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder='Last name, E.G Jones'
          />
          {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
          <Input
            style={inputBottomMargin}
            type='email'
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder='Email, E.G aaa@gmail.com'
          />
          {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
          <Input
            style={inputBottomMargin}
            name="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            placeholder='gender, E.G Male of Female'
          />
          {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
          <Button 
            onClick={() => submitForm()} 
            type="submit" 
            disabled={isSubmitting || isEmpty(touched) || !isValid}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default AddStudentFrom;