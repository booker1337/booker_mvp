import React from 'react';
import { FormTemplate } from '../Form/Form';
import ValidForm from '../ValidForm/ValidForm';
import { login as validation } from '../../utils/validationService';

const LoginPage = ({ login }) => {
  return (
    <FormTemplate linkTo={'/signup'} linkText="Crate a booker account?">
      <ValidForm
        title="Log into Booker"
        actionText="Log In"
        action={login}
        fields={{
          loginID: {
            label: "Username or email",
            type: "text",
            autoComplete: "username",
            validation: validation.validateLoginId
          },
          password: {
            label: "Password",
            type: "password",
            autoComplete: "current-password",
            validation: validation.validatePassword
          }
        }}
      />
    </FormTemplate>
  )
};

export default LoginPage;
