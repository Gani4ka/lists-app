'use client';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import * as Label from '@radix-ui/react-label';
import { Button } from '@radix-ui/themes';

import { signinUser, signupUser } from '@app/api/user';

import styles from './auth.module.css';

export default function AuthForm() {
  const { pending } = useFormStatus();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onLoginHandler = async () => {
    setIsLogin(!isLogin);
  };

  const content = (
    <div>
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
          <input className="Input" type="text" id="username" name="username" />
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
        <input className="Input" type="email" id="email" name="email" />
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
          name="password"
        />
      </div>
      {isLogin ? (
        <div>
          <p className={styles.link} onClick={onLoginHandler}>
            No account? <span>Sign up</span> here
          </p>
          <Button formAction={signinUser} disabled={pending} type="submit">
            Login
          </Button>
        </div>
      ) : (
        <div>
          <p className={styles.link} onClick={onLoginHandler}>
            Already have an account? <span>Login</span> then
          </p>
          <Button formAction={signupUser} disabled={pending} type="submit">
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );

  return content;
}
