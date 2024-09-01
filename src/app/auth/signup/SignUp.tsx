'use client';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import * as Label from '@radix-ui/react-label';
import { Button } from '@radix-ui/themes';

import { signupUser } from '@app/api/user';
import { AuthError } from '@app/types/list.types';

import styles from '../auth.module.css';
const initialState: AuthError = {
  message: '',
};

export default function SignUp() {
  const [state, formAction] = useFormState(signupUser, initialState);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (state && state.message) {
      setErrorMessage(state.message);
    }
  }, [state]);

  const content = (
    <form action={formAction} onSubmit={() => setErrorMessage('')}>
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
      <SubmitButton />
      <a className={styles.link} href="/auth/login">
        Already have an account? <span>Login</span> then
      </a>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );

  return content;
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button disabled={pending} type="submit">
        Sign Up
      </Button>
    </div>
  );
}
