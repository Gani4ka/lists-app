'use client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { signinUser } from '@app/api/user';
import ResetPasswordLink from '@app/app/reset-password/components/ResetPasswordLink';

import AuthLink from '../components/AuthLink';
import Email from '../components/Email';
import Password from '../components/Password';
import SubmitButton from '../components/SubmitButton';
const initialState = {
  message: '',
};

export default function Login() {
  const [state, formAction] = useFormState(signinUser, initialState);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (state && state.message) {
      setErrorMessage(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={formAction} onSubmit={() => setErrorMessage('')}>
        <Email />
        <Password />
        <SubmitButton btnText={'Login'} />
        <AuthLink
          text={'No account?'}
          linkText={'Sign up'}
          errorMessage={errorMessage}
          link={'/auth/signup'}
        />
      </form>
      <ResetPasswordLink />
    </div>
  );
}
