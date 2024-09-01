'use client';
import React from 'react';

import AuthForm from './AuthForm';

const Auth = () => {
  return (
    <form>
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
    </form>
  );
};
export default Auth;
