import React from 'react';

const ProfilePage = ({ user }) => {
  return (
    <div>{JSON.stringify(user)}</div>
  );
};

export default ProfilePage;