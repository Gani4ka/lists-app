'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthError, AuthUser } from '@app/types/list.types';

export const setCookies = (name: string, data: string) => {
  cookies().set(name, data);
};
export async function signupUser(prevState: AuthError, formData: FormData) {
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  };
  console.log('sign up');

  const signUpRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}signup`, {
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
  console.log('sign in');
  const signInRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (signInRes.ok) {
    const json = await signInRes.json();
    const authUser = { user: json.user, token: json.token } as AuthUser;
    console.log('authUser:', authUser);
    setCookies('auth-user', authUser.user.username);
    setCookies('token', authUser.token);
    redirect('/');
  } else {
    setCookies('auth-user', '');
    setCookies('token', '');
    const err = await signInRes.json();
    console.log('else', err);
    return { message: err.error };
  }
}

export const logout = () => {
  console.log('loging out');
  cookies().delete('auth-user');
  cookies().delete('token');
  redirect('/auth');
};
