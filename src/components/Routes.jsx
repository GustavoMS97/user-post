import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Login from '../screens/Login';
import Landing from '../screens/Landing';
import Home from '../screens/Home';
import Posts from '../screens/Posts';
import { validateBearerToken } from '../utils/authUtils';

class Routes extends Component {
  state = { authorized: false };
  async componentDidMount() {
    const res = await validateBearerToken();
    this.setState({ authorized: res });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.auth && newProps.auth.id) {
      this.setState({ authorized: true });
    }
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.state.authorized ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    );

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            {/* LANDING PAGE */}
            <Route path='/' exact component={Landing} />
            {/* REGISTER */}
            <Route
              path='/register'
              exact
              component={() => <h1>Cadastre-se</h1>}
            />
            {/* LOGIN */}
            <Route path='/login' exact component={Login} />
            {/* HOME */}
            <PrivateRoute path='/home' exact component={Home} />
            {/* POSTS */}
            <PrivateRoute path='/posts' exact component={Posts} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Routes);
