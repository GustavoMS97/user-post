import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeToken } from '../utils/tokenUtils';

const styles = {
  headerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    border: '1px lightblue solid',
  },
};

class Header extends Component {
  renderContent() {
    const { auth } = this.props;
    return auth
      ? [
          <li key='1'>
            <Link to='/posts'>My Profile</Link>
          </li>,
          <li key='2'>
            <a onClick={async () => await removeToken()} href='/'>
              logout
            </a>
          </li>,
        ]
      : [
          <li key='3'>
            <a href='/register'>Sign Up</a>
          </li>,
          <li key='4'>
            <a href='/login'>Sign in</a>
          </li>,
        ];
  }

  render() {
    const { headerContainer } = styles;
    return (
      <nav>
        <div className='nav-wrapper blue' style={headerContainer}>
          <Link
            to={this.props.auth ? '/home' : '/'}
            className='brand-logo left'
          >
            Twitter-like App
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
