'use client';
import React from 'react';

import AuthForm from './AuthForm';

const Auth = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <h2>Lists app</h2>
      <AuthForm />
    </div>
  );
};
export default Auth;
