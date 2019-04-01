import React, { Component } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import {
  BASE_URL,
  BASE_URL_POST_API,
  USER_OWN_POSTS_API,
} from '../config/Urls';
import { returnToken } from '../utils/tokenUtils';
import '../styles/Posts.css';

class Posts extends Component {
  state = { posts: [] };
  async componentDidMount() {
    try {
      const posts = await axios.get(
        BASE_URL + BASE_URL_POST_API + USER_OWN_POSTS_API,
        { headers: { Authorization: await returnToken() } },
      );
      this.setState({ posts: posts.data.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { rowDivStyle } = styles;
    return (
      <div className='container'>
        <div className='row' style={rowDivStyle}>
          <h1 style={{ color: '#595959' }}>Meus posts</h1>
        </div>
        {this.state.posts && this.state.posts.length > 0 ? (
          <div className='my-posts-container'>
            <PostList posts={this.state.posts} />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h4>Não possui posts ainda</h4>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  rowDivStyle: {
    width: '100',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Posts;
