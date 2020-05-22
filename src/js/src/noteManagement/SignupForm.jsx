import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Icon } from 'antd';
import { signup } from '../client.js';
import { isEmpty, isEmail } from '../util.js';

const tagStyle = { color: '#e2231a', fontSize: '17px'};
const inputStyle = { marginBottom: '10px', width: '350px', display: 'block' };

const SignupForm = (props) => {
  return (
    <div>
      <h1 className='big_title'>Sign up</h1>
      <Formik
        initialValues={{
          name: '',
          password: '',
          email: '',
        }}
        validate={values => {
          const errors = {};

          if (!values.name) {
            errors.name = 'Name required';
          } else if (values.name.length > 80) {
            errors.name = 'Name should be shorter than 80 characters'
          }

          if (!values.password) {
            errors.password = 'Password required';
          } else if (values.password.length > 18) {
            errors.password = 'Password should be shorter than 18 characters'
          } else if (values.password.indexOf(' ') > -1) {
            errors.password = 'No space is allowed in password';
          }

          if (!values.email) {
            errors.email = 'E-mail required';
          } else if (!isEmail(values.email)) {
            errors.email = 'invalid E-mail address';
          } else if (values.email.length > 100) {
            errors.email = 'E-mail should be shorter than 100 characters'
          }

          return errors;
        }}
        onSubmit={(user, { setSubmitting }) => {
          // console.log(user)
          signup(user)
            .then(() => { props.onSuccess(); })
            .catch(err => { props.onFailure(err); })
            .finally(() => { setSubmitting(false); });
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
              <span className='chalkboard_font'>name:</span> {errors.name && touched.name && <span style={tagStyle}>{errors.name}</span>}
              <Input
                style={inputStyle}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder='please insert user name'
              />
              <span className='chalkboard_font'>password:</span> {errors.password && touched.password && <span style={tagStyle}>{errors.password}</span>}
              <Input
                style={inputStyle}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='please insert password'
              />
              <span className='chalkboard_font'>email:</span> {errors.email && touched.email && <span style={tagStyle}>{errors.email}</span>}
              <Input
                style={inputStyle}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='please insert email'
              />
              <div>
                <Button
                  onClick={() => props.OnSitchToLogin()}
                  style={{ marginRight: '10px' }}
                >
                  <Icon type="left" />Go to Login 
                </Button>
                <Button
                  onClick={() => submitForm()}
                  type="submit"
                  disabled={isSubmitting || isEmpty(touched) || !isValid}
                >
                  Sign up<Icon type="right" />
                </Button>
              </div>
            </form>
          )}
      </Formik> 
    </div>
  );
}

export default SignupForm;