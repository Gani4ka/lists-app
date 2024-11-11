'use client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { signupUser } from '@app/api/user';
import ResetPasswordLink from '@app/app/reset-password/components/ResetPasswordLink';
import { AuthError } from '@app/types/list.types';

import AuthLink from '../components/AuthLink';
import Email from '../components/Email';
import Password from '../components/Password';
import SubmitButton from '../components/SubmitButton';
import Username from '../components/Username';
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

  return (
    <div>
      <form action={formAction} onSubmit={() => setErrorMessage('')}>
        <Username />
        <Email />
        <Password />
        <SubmitButton btnText={'SignUp'} />
        <AuthLink
          text={'Already have an account?'}
          linkText={'Login'}
          errorMessage={errorMessage}
          link={'/auth/login'}
        />
      </form>
      <ResetPasswordLink />
    </div>
  );
}
