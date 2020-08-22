import React, { useState } from 'react';

const AuthFormInput = ({ label, value, type, handleChange }) => (
  <div className='row'>
    <div className='col-10 col-sm-8 mx-auto'>
      <label className='d-block'>{label}</label>
      <input className='w-100' type={type} value={value} onChange={handleChange} />
    </div>
  </div>
);

const AuthForm = ({ children, title }) => (
  <form className='m-4 p-3'>
    <h4 className='pb-2 text-center'>{title}</h4>
    {children}
  </form>
);

function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getHandleChange = (setter) => (e) => setter(e.target.value);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 col-md-8 mx-auto m-4 border'>
          <AuthForm title='Sign Up'>
            <AuthFormInput
              label='Username'
              value={username}
              type='text'
              handleChange={getHandleChange(setUsername)}
            />
            
            <AuthFormInput
              label='Password'
              value={password}
              type='password'
              handleChange={getHandleChange(setPassword)}
            />
          </AuthForm>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;