import React from 'react';
import { Link } from 'react-router-dom';

const AuthFormInput = ({ name, label, value, type, autoComplete, handleChange }) => (
  <div className='row my-2'>
    <div className='col-10 col-sm-8 mx-auto'>
      <label className='d-block'>{label}</label>
      <input
        className='form-control'
        autoComplete={autoComplete}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  </div>
);

const AuthForm = ({ children, title, actionText, handleSubmit }) => (
  <form onSubmit={handleSubmit} className='m-4 p-3'>
    <h4 className='pb-2 text-center'>{title}</h4>
    {children}
    <div className='d-flex mt-5'>
      <input
        className='mx-auto btn btn-primary text-uppercase'
        type='submit'
        value={actionText}
      />
    </div>
  </form>
);

const AuthTemplate = ({ children, linkTo, linkText }) => (
  <div className='container'>
    <div className='row'>
      <div className='col-10 col-md-8 mx-auto m-4 border'>
        {children}
      </div>
      <Link className="col-12 text-center" to={linkTo}>{linkText}</Link>
    </div>
  </div>
);

export default {
  Template: AuthTemplate,
  Form: AuthForm,
  FormInput: AuthFormInput,
}