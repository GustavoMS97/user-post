import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  headerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
};

class Header extends Component {
  renderContent() {
    return [
      <li key='1'>
        <a href='/register' >Sign Up</a>
      </li>,
      <li key='2'>
        <a href='/login' >Sign in</a>
      </li>,
    ];
  }

  render() {
    const { headerContainer } = styles;
    return (
      <nav>
        <div className='nav-wrapper blue' style={headerContainer}>
          <Link to='/' className='brand-logo left'>
            Twitter-like App
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default Header;
