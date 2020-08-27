import React, { useState, useEffect } from 'react';
import userProfileService from '../../utils/userProfileService';

import { Redirect } from 'react-router-dom';

const ProfilePage = ({ user, history }) => {
  const [onboardDone, setOnboardDone] = useState(undefined);

  useEffect(() => {
    userProfileService.getUserProfile(user);
    setOnboardDone(false) // replace false with condition for: has the user finished onboarding yet?
  }, [user, history]);


  if (onboardDone === false) return <Redirect to="/start" />
  
  else if (onboardDone === true)
    return (
      <div>Profile Page{JSON.stringify(user)}</div>
    );
  
  return (
    <div>checking onboard status...</div>
  );
};

export default ProfilePage;