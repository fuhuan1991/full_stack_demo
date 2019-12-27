import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Icon } from 'antd';
import { login } from '../client.js';
import { isEmpty } from '../util.js';

const tagStyle = { color: '#e2231a'};
const inputStyle = { marginBottom: '10px', width: '350px', display: 'block' };

const LoginForm = (props) => {
  return (
    <div>
      <h1 className='big_title'>Log in</h1>
      <Formik
        initialValues={{ 
          name: '',
          password: '',
        }}
        validate={values => {
          const errors = {};

          if (!values.name) {
            errors.name = 'name required';
          }

          if (!values.password) {
            errors.password = 'password required';
          }

          return errors;
        }}
        onSubmit={(user, { setSubmitting }) => {
          login(user)
          .then((o) => { props.onSuccess(o); })
          .catch(err => { props.onFailure(err); setSubmitting(false);})
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
            <div>
              <Button 
                onClick={() => props.OnSitchToSignup()} 
                style={{marginRight: '10px'}}
              >
                <Icon type="left" /> Go to Sign up 
              </Button>
              <Button 
                onClick={() => submitForm()} 
                type="primary" 
                disabled={isSubmitting || isEmpty(touched) || !isValid}
              >
                Login <Icon type="right" />
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;