/* eslint-disable no-alert */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import FormField from '../components/FormField';
import formFields from './forms/registerFormFields';
import '../styles/Login.css';
import { BASE_URL, BASE_URL_USER_API, USER_LOGIN_API } from '../config/Urls';
import { authorizeUserAndPush } from '../actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.onRegisterSubmitted = this.onRegisterSubmitted.bind(this);
  }

  async onRegisterSubmitted(values) {
    try {
      const registerRes = await axios.post(
        BASE_URL + BASE_URL_USER_API,
        values,
      );

      console.log(registerRes.status);

      if (registerRes.status === 201) {
        this.loginProcess({ email: values.email, password: values.password });
      } else {
        window.alert(`Ops! There was a problem with your register request.`);
      }
    } catch (error) {
      console.log(error);
      window.alert(
        `Ops! There was a problem with your register request.\n${error}`,
      );
    }
  }

  async loginProcess(values) {
    const res = await axios.post(
      BASE_URL + BASE_URL_USER_API + USER_LOGIN_API,
      values,
    );

    const { history, authorizeUserAndPush } = this.props;
    if (localStorage) {
      if (res.data.token && res.data.type === 'Bearer') {
        await localStorage.setItem('token', `Bearer ${res.data.token}`);
        authorizeUserAndPush(history);
      } else {
        window.alert(res.message);
      }
    }
  }

  renderFields() {
    return formFields.map(({ name, label, type }) => (
      <Field
        key={name}
        name={name}
        label={label}
        type={type}
        component={FormField}
      />
    ));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='container'>
        <div
          className='row'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <form
            onSubmit={handleSubmit(this.onRegisterSubmitted)}
            className='col s6 z-depth-3 form-width form'
            style={{
              marginLeft: 'unset',
              border: '2px solid #2196F3',
              marginTop: '10%',
            }}
          >
            {this.renderFields()}
            <Link to='/' className='red btn-flat white-text'>
              Cancel
            </Link>
            <button type='submit' className='teal btn-flat right white-text'>
              Registrar
              <i className='material-icons right'>done</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} obrigatório!`;
    }
  });

  return errors;
}

Register = connect(
  null,
  { authorizeUserAndPush },
)(Register);

export default reduxForm({
  form: 'registerForm',
  validate,
})(withRouter(Register));
