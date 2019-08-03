import React from 'react';

const Register = () => {
  return (
    <div className='container'>
      <div className='form-container'>
        <h1>Account Register</h1>
        <form>
          <div className='form-group row'>
            <div className='col'>
              <label htmlFor='name'>First Name</label>
              <input
                type='text'
                className='form-control'
                name='firstname'
                placeholder='Enter First Name'
              />
            </div>
            <div className='col'>
              <label htmlFor='name'>Last Name</label>
              <input
                type='text'
                className='form-control'
                name='lastname'
                placeholder='Enter Last Name'
              />
            </div>
          </div>
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
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              className='form-control'
              name='password2'
              placeholder='Confirm Password'
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

export default Register;
