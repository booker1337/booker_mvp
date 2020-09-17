import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import userProfileService from '../../utils/userProfileService';

const ProfilePage = ({ user }) => (
  <div>Profile Page{JSON.stringify(user)}</div>
);

const LoadProfilePage = ({ user }) => {
  const [onboardDone, setOnboardDone] = useState(undefined);

  useEffect(() => {
    userProfileService.getUserProfile(user);
    setOnboardDone(false) // replace false with condition for: has the user finished onboarding yet?
  }, [user]);

  return (
    (onboardDone === undefined)
      ? null
      : (onboardDone === false)
        ? <Redirect to="/start" />
        : <ProfilePage user={user} />
  );
};

export default LoadProfilePage;