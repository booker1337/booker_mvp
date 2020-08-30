function usernameIsPresent(username) {

}

function emailIsPresent(email) {

}

function signupUsernameIsValid(username) {
  if(username === '')
    return [false, 'required']

  if(username.length < 3)
    return [false, 'too short'];

  if(username.length > 20)
    return [false, 'too long'];

  if(!username.match(/^\w*$/))
    return [false, 'contains invalid characters'];

  // check if username is available

  return [true];
}

function signupEmailIsValid(email) {
  
}

function signupPasswordIsValid(password) {
  
}

function signupConfirmationIsValid(confirmation) {

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