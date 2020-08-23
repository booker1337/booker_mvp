import React, { useState } from 'react';
import Auth from '../Auth/Auth';

const SignupPage = ({ signup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    signup(formData);
  };

  return (
    <Auth.Template linkTo={'/login'} linkText="Already have a booker account?">
      <Auth.Form
        title="Join Booker"
        actionText="get started"
        handleSubmit={handleSubmit}
      >
        <Auth.FormInput
          name="username"
          label="Username"
          value={formData.username}
          type="text"
          autoComplete="username"
          handleChange={handleChange}
        />

        <Auth.FormInput
          name="email"
          label="Email"
          value={formData.email}
          type="email"
          autoComplete="email"
          handleChange={handleChange}
        />

        <Auth.FormInput
          name="password"
          label="Password"
          value={formData.password}
          type="password"
          autoComplete="current-password"
          handleChange={handleChange}
        />
      </Auth.Form>
    </Auth.Template>
  );
};

export default SignupPage;