'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ResetPasswordResponse } from '@app/app/reset-password/reset-password-form/types';
import { AuthError, AuthUser } from '@app/types/list.types';
import { getBackendUrl } from '@app/utils/getBackendUrl';
const backendUrl = getBackendUrl();

export const setCookies = (name: string, data: string) => {
  cookies().set(name, data);
};

export const getUserToken = async (): Promise<string> => {
  const token = cookies().get('token');
  if (token && token.value) {
    return token.value;
  } else {
    throw new Error('Token is not found/valid. Try loging in again');
  }
};

export async function signupUser(prevState: AuthError, formData: FormData) {
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  };

  const signUpRes = await fetch(`${backendUrl}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (signUpRes.ok) {
    redirect('/auth/login');
  } else {
    const err = await signUpRes.json();
    console.log(err);
    return { message: err.error };
  }
}
export async function signinUser(prevState: AuthError, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const signInRes = await fetch(`${backendUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (signInRes.ok) {
    const json = await signInRes.json();
    const authUser = { user: json.user, token: json.token } as AuthUser;
    //save token and user's data to use it for each api call
    setCookies('auth-user', authUser.user.username);
    setCookies('token', authUser.token);
    redirect('/');
  } else {
    const err = await signInRes.json();
    return { message: err.error };
  }
}

export const logout = () => {
  cookies().delete('auth-user');
  cookies().delete('token');
  redirect('/auth');
};
export const resetPassword = async (
  email: string
): Promise<ResetPasswordResponse> => {
  try {
    const response = await fetch(`${backendUrl}reset-password-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    const eString = JSON.stringify(error);

    return { error: true, message: eString };
  }
};
