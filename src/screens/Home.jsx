import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL, BASE_URL_POST_API } from '../config/Urls';
import { returnToken } from '../utils/tokenUtils';

class Home extends Component {
  state = { posts: [] };
  async componentDidMount() {
    try {
      const posts = await axios.get(BASE_URL + BASE_URL_POST_API, {
        headers: { Authorization: await returnToken() },
      });
      console.log(posts.data);
      this.setState({ posts: posts.data.reverse() });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <h1>Olá, esta é sua timeline</h1>
      </div>
    );
  }
}

export default Home;
