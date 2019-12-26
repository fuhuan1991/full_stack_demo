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
      <h1>Log in</h1>
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
            <div>
              <Button 
                onClick={() => props.OnSitchToSignup()} 
                style={{marginRight: '10px'}}
              >
                <Icon type="left" /> Go to Sign up 
              </Button>
              <Button 
                onClick={() => submitForm()} 
                type="submit" 
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