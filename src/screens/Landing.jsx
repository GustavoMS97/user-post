import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth) {
      this.props.history.push('/home');
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.auth && newProps.auth.id) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div>
        <h1>Olá, bem vindo ao twitter-like app</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(withRouter(Landing));
