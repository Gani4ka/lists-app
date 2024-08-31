'use client';
import { useState } from 'react';
import React from 'react';
import * as Label from '@radix-ui/react-label';

import { signupUser } from '@app/api/user';
import { User } from '@app/types/list.types';
const SignUp = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSignUpHandler = async () => {
    console.log(username, email, password);

    if (username && email && password) {
      const user: User = {
        username: username,
        email: email,
        password: password,
      };
      const signUpRes = await signupUser(user);
      console.log('signUpRes', signUpRes);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Lists app</h2>
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
        <button onClick={onSignUpHandler}>Sign Up</button>
      </div>
    </div>
  );
};
export default SignUp;
