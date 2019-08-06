import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const authContext = useContext(AuthContext);

  const { registerUser, isAuthenticated, error, clearErrors } = authContext;

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  });

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      console.log('Please enter all fields.');
    } else if (password !== password2) {
      console.log('Passwords do not match.');
    } else {
      registerUser({
        firstName,
        lastName,
        email,
        password
      });
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h1>Account Register</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group row'>
            <div className='col'>
              <label htmlFor='name'>First Name</label>
              <input
                type='text'
                className='form-control'
                name='firstName'
                placeholder='Enter First Name'
                onChange={onChange}
                required
              />
            </div>
            <div className='col'>
              <label htmlFor='name'>Last Name</label>
              <input
                type='text'
                className='form-control'
                name='lastName'
                placeholder='Enter Last Name'
                onChange={onChange}
                required
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
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              placeholder='Enter Password'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              className='form-control'
              name='password2'
              placeholder='Confirm Password'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              className='btn btn-primary btn-block'
              name='submit'
              value='Register'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
