import tokenService from './tokenService';

const getUserProfile = async (userId) => {
  const res = await fetch(`/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  });

  if(res.ok) {
    const user = await res.json();
    console.log(user);
  }
  else {
    const errors = await res.json();
    console.log(errors);
  }
};

export default {
  getUserProfile
}

