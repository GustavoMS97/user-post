import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => (
  <div className='row'>
    <div className='input-field col s12'>
      <input {...input} id={input.name} type={type} />
      <label htmlFor={input.name}>{label}</label>
      <div className='red-text'>{touched && error}</div>
    </div>
  </div>
);
