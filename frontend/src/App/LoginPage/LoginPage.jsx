import React from 'react';

const LoginPage = React.memo(({ login }) => {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });

  // const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login(formData);
  // };

  return (
    <div>login page</div>
    // <Auth.Template linkTo={'/signup'} linkText="Join Booker">
    //   <Auth.Form title="Booker Member? Log In" actionText="get started" handleSubmit={handleSubmit}>
    //     <Auth.FormInput
    //       name="username"
    //       label="Username"
    //       value={formData.username}
    //       type="text"
    //       autoComplete="username"
    //       handleChange={handleChange}
    //     />

    //     <Auth.FormInput
    //       name="password"
    //       label="Password"
    //       value={formData.password}
    //       type="password"
    //       autoComplete="current-password"
    //       handleChange={handleChange}
    //     />
    //   </Auth.Form>
    // </Auth.Template>
  );
});

export default LoginPage;