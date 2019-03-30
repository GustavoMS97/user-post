/* eslint-disable no-alert */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import FormField from '../components/FormField';
import formFields from './forms/loginFormFields';
import '../styles/Login.css';
import { BASE_URL, BASE_URL_USER_API, USER_LOGIN_API } from '../config/Urls';
import { authorizeUserAndPush } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginSubmitted = this.onLoginSubmitted.bind(this);
  }

  async onLoginSubmitted(values) {
    try {
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
    } catch (error) {
      console.log(error);
      window.alert(
        `Ops! There was a problem with your login request.\n${error}`,
      );
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
            onSubmit={handleSubmit(this.onLoginSubmitted)}
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
              Logar
              <i className='material-icons right'>done</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line no-class-assign
Login = connect(
  null,
  { authorizeUserAndPush },
)(Login);

export default reduxForm({
  form: 'loginForm',
})(withRouter(Login));
