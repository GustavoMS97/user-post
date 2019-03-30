import React, { Component } from 'react';
import axios from 'axios';
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

  renderPosts() {
    return this.state.posts.map((post) => (
      <div
        key={post.id}
        className='row'
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
        }}
      >
        <div className='col s12'>
          <div className='card'>
            <div className='card-content'>
              <span className='card-title' style={{ color: '#595959' }}>
                {post.title}
              </span>
              <p>{post.post}</p>
            </div>
            <div className='card-action' style={{ paddingBottom: '35px' }}>
              <a
                className='right'
                href='/selectedPost'
                style={{ color: '#2196F3' }}
              >
                Tweeted at:{' '}
                {new Date(post.createdAt).toLocaleDateString() +
                  ' ' +
                  new Date(post.createdAt).toLocaleTimeString()}
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className='container'>
        <div
          className='row'
          style={{
            width: '100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: '#595959' }}>Meus posts</h1>
        </div>
        <div className='my-posts-container'>{this.renderPosts()}</div>
      </div>
    );
  }
}

export default Posts;
