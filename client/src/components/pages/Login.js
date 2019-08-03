import React from 'react';

const Login = () => {
  return (
    <div className='container'>
      <div className='form-container'>
        <h1>Account Login</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              className='form-control'
              name='email'
              placeholder='Enter Email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              placeholder='Enter Password'
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              className='btn btn-primary btn-block'
              name='submit'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
