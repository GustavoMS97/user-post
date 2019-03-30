import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeUserWithoutPush } from '../actions';
import Routes from './Routes';
import { returnToken } from '../utils/tokenUtils';

class App extends Component {
  async componentDidMount() {
    const token = await returnToken();
    const { authorizeUserWithoutPush } = this.props;
    if (token) {
      authorizeUserWithoutPush();
    }
  }

  render() {
    return <Routes />;
  }
}

export default connect(
  null,
  { authorizeUserWithoutPush },
)(App);
