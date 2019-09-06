import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { isAuthenticated, loginUser, error, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  });

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      console.log('Please enter all fields.');
    } else
      loginUser({
        email,
        password
      });
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className='container'>
      <div className='form-container'>
        <h1>Account Login</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type='submit'
              className='btn btn-primary btn-block'
              name='submit'
              value='Login'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
