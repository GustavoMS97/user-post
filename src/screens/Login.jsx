/* eslint-disable no-alert */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormField from '../components/FormField';
import formFields from './forms/loginFormFields';
import '../styles/Login.css';
import { BASE_URL, BASE_URL_USER_API, USER_LOGIN_API } from '../static/Urls';

class Login extends Component {
  async onLoginSubmitted(values) {
    try {
      const res = await axios.post(BASE_URL + BASE_URL_USER_API + USER_LOGIN_API, values);
      console.log(res.data);
      if (localStorage) {
        if (res.data.token && res.data.type === 'Bearer') {
          localStorage.setItem('token', `Bearer ${res.token}`);
        } else {
          window.alert(res.message);
        }
      }
    } catch (error) {
      console.log(error);
      window.alert('Ops! There was a problem with your login request.');
    }
  }

  renderFields() {
    return formFields.map(({ name, label, type }) => (
      <Field key={name} name={name} label={label} type={type} component={FormField} />
    ));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='container'>
        <div
          className='row'
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <form
            onSubmit={handleSubmit(this.onLoginSubmitted)}
            className='col s6 z-depth-3 form-width form'
            style={{ marginLeft: 'unset', border: '2px solid #2196F3', marginTop: '10%' }}
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

export default reduxForm({
  form: 'loginForm',
})(Login);
