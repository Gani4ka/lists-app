'use client';
import { useState } from 'react';
import React from 'react';
import * as Label from '@radix-ui/react-label';
import { Button } from '@radix-ui/themes';

import { signinUser, signupUser } from '@app/api/user';
import { User } from '@app/types/list.types';

import styles from './auth.module.css';

const SignUp = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onSignUpHandler = async () => {
    if (isLogin) {
      if (email && password) {
        await signinUser(email, password);
      }
    } else {
      if (username && email && password) {
        const user: User = {
          username: username,
          email: email,
          password: password,
        };
        const signUpRes = await signupUser(user);
        console.log('signUpRes', signUpRes);
      }
    }
  };

  const onLoginHandler = async () => {
    setIsLogin(!isLogin);
  };

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
      {!isLogin && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1rem 0',
          }}
        >
          <Label.Root className="LabelRoot" htmlFor="username">
            Username
          </Label.Root>
          <input
            className="Input"
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '1rem 0',
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="email">
          Email
        </Label.Root>
        <input
          className="Input"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '1rem 0',
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="password">
          Password
        </Label.Root>
        <input
          className="Input"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      {isLogin ? (
        <p onClick={onLoginHandler} className={styles.link}>
          No account? <span>Sign up</span> here
        </p>
      ) : (
        <p onClick={onLoginHandler} className={styles.link}>
          Already have an account? <span>Login</span> then
        </p>
      )}
      <Button onClick={onSignUpHandler}>{isLogin ? 'Login' : 'Sign Up'}</Button>
    </div>
  );
};
export default SignUp;
