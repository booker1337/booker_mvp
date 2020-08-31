const usernameIsPresent = (username, signal) => ( 
  fetch(`/api/valid/isUsernamePresent/${username}`, { signal })
    .then(async res => {
      if(res.ok) {
        const body = await res.json();
        return body.present;
      }
      else {
        const { errors } = await res.json();
        console.log(errors);
      }
    })
    .catch(err => {})
);

const emailIsPresent = (email, signal) => ( 
  fetch(`/api/valid/isEmailPresent/${email}`, { signal })
    .then(async res => {
      if(res.ok) {
        const body = await res.json();
        return body.present;
      }
      else {
        const { errors } = await res.json();
        console.log(errors);
      }
    })
    .catch(err => {})
);

async function signupUsernameIsValid(username, values, validation, signal) {
  if(username === '')
    return [false, 'required']

  if(username.length < 3)
    return [false, 'too short'];

  if(username.length > 20)
    return [false, 'too long'];

  if(!username.match(/^\w*$/))
    return [false, 'invalid symbols'];

  if(await usernameIsPresent(username, signal)) {
    return [false, 'already taken']
  }

  return [true, 'valid'];
}

async function signupEmailIsValid(email, values, validation, signal) {
  if(email === '')
    return [false, 'required']

  if(await emailIsPresent(email, signal)) {
    return [false, 'already taken']
  }

  return [true, 'valid'];
}

async function signupPasswordIsValid(password, values, validation, signal) {
  if(password.length < 3)
    return [false, 'too short'];
  
  return [true, 'valid'];
}

async function signupConfirmationIsValid(confirmation, values, validation, signal) {
  if(values.password !== confirmation)
    return [false, 'must match'];

  return [true, 'valid'];
}

// all validation functions return [isValid, feedback]
export const signup = {
  validateUsername: signupUsernameIsValid,
  validateEmail: signupEmailIsValid,
  validatePassword: signupPasswordIsValid,
  validateConfirmation: signupConfirmationIsValid
};

// export const login = {
//   validateLoginId: loginLoginIdIsValid,
//   validatePassword: loginPasswordIsValid
// };

// export const profile = {

// };

export default {
  signup,
  // login,
  // profile
}