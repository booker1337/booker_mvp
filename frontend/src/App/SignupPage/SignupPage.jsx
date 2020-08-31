import React from 'react';
import { FormTemplate } from '../Form/Form';
import ValidForm from '../ValidForm/ValidForm';
import { signup as validation } from '../../utils/validationService';

const SignupPage = ({ signup }) => {
  return (
    <FormTemplate linkTo={'/login'} linkText="Already have a booker account?">
      <ValidForm
        title="Join Booker"
        actionText="get started"
        action={signup}
        fields={{
          username: {
            label: "Username",
            type: "text",
            autoComplete: "username",
            validation: validation.validateUsername
          },
          email: {
            label: "Email",
            type: "email",
            autoComplete: "email",
            validation: validation.validateEmail
          },
          password: {
            label: "Password",
            type: "password",
            autoComplete: "current-password",
            validation: validation.validatePassword
          },
          confirmation: {
            label: "Confirm Password",
            type: "password",
            autoComplete: "current-password",
            validation: validation.validateConfirmation
          }
        }}
      />
    </FormTemplate>
  )
};

export default SignupPage;