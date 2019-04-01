import React from 'react';
import '../styles/Posts.css';

const renderPostOwner = (owner) => {
  return (
    <div>
      Post owner: <span style={{ color: 'lightsteelblue' }}>{owner.name}</span>
    </div>
  );
};

const PostList = ({ posts }) => {
  return posts.map((post) => (
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
            {post.owner ? renderPostOwner(post.owner) : true}
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
};

export default PostList;
