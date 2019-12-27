import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Icon } from 'antd';
import { signup } from '../client.js';
import { isEmpty, isEmail } from '../util.js';

const tagStyle = { color: '#e2231a'};
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
            errors.name = 'name required';
          }

          if (!values.password) {
            errors.password = 'password required';
          }

          if (!isEmail(values.email)) {
            errors.email = 'invalid E-mail address';
          }

          if (!values.email) {
            errors.email = 'E-mail required';
          }

          return errors;
        }}
        onSubmit={(user, { setSubmitting }) => {
          // console.log(user)
          signup(user)
            .then(() => { props.onSucess(); })
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
              name: {errors.name && touched.name && <span style={tagStyle}>{errors.name}</span>}
              <Input
                style={inputStyle}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder='please insert user name'
              />
              password: {errors.password && touched.password && <span style={tagStyle}>{errors.password}</span>}
              <Input
                style={inputStyle}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='please insert password'
              />
              email: {errors.email && touched.email && <span style={tagStyle}>{errors.email}</span>}
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