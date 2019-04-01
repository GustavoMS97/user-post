import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL, BASE_URL_POST_API } from '../config/Urls';
import { returnToken } from '../utils/tokenUtils';
import PostList from '../components/PostList';
import '../styles/Home.css';

class Home extends Component {
  state = {
    posts: [],
    title: '',
    post: '',
    titleError: '',
    postError: '',
    test: false,
  };
  async componentDidMount() {
    try {
      const posts = await axios.get(BASE_URL + BASE_URL_POST_API, {
        headers: { Authorization: await returnToken() },
      });
      this.setState({ posts: posts.data.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  async onSubmit() {
    if (!this.state.title || this.state.title.trim().length === 0) {
      await this.setState({ titleError: 'Campo obrigatorio!' });
    } else {
      await this.setState({ titleError: '' });
    }

    if (!this.state.post || this.state.post.trim().length === 0) {
      await this.setState({ postError: 'Campo obrigatorio!' });
    } else {
      await this.setState({ postError: '' });
    }

    if (
      this.state.postError.length === 0 &&
      this.state.titleError.length === 0
    ) {
      const { title, post } = this.state;
      const obj = { title, post };
      try {
        axios.post(BASE_URL + BASE_URL_POST_API, obj, {
          headers: { Authorization: await returnToken() },
        });
        window.location.reload();
      } catch (error) {
        alert('Erro ao enviar tweet.');
      }
    }
  }

  render() {
    const { rowDivStyle, tweetFormDiv } = styles;
    return (
      <div className='container'>
        <div className='row' style={rowDivStyle}>
          <h1 style={{ color: '#595959' }}>Timeline</h1>
        </div>
        <div className='z-depth-3 tweet-form' style={tweetFormDiv}>
          <div className='input-field' style={rowDivStyle}>
            <input
              id='title'
              type='text'
              value={this.state.title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <label htmlFor='title'>Qual o título?</label>
          </div>
          <div className='red-text'>{this.state.titleError}</div>
          <div className='input-field' style={rowDivStyle}>
            <textarea
              id='post'
              className='materialize-textarea'
              value={this.state.post}
              onChange={(event) => this.setState({ post: event.target.value })}
            />
            <label htmlFor='post'>O que está pensando?</label>
          </div>
          <div className='red-text'>{this.state.postError}</div>
          <button
            className='waves-effect waves-light btn right'
            type='submit'
            onClick={() => this.onSubmit()}
          >
            Enviar
            <i className='material-icons right'>done</i>
          </button>
        </div>

        {this.state.posts && this.state.posts.length > 0 ? (
          <div className='my-posts-container'>
            <PostList posts={this.state.posts} hasOwner />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h4>Não existem posts ainda</h4>
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
  tweetFormDiv: {
    border: '2px solid #2196F3',
    padding: '10px',
    paddingBottom: '50px',
    marginBottom: '10px',
  },
};

export default Home;
