'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthUser, User } from '@app/types/list.types';

export const setCookies = (name: string, data: string) => {
  cookies().set(name, data);
};
export async function signupUser(user: User) {
  try {
    const signUpRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return signUpRes;
  } catch (err) {
    console.log('error', err);
  }
}
export async function signinUser(email: string, password: string) {
  try {
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
    } else {
      setCookies('auth-user', '');
      setCookies('token', '');
    }
  } catch (err) {
    console.log('login error:', err);
  } finally {
    redirect('/categories');
  }
}

export const logout = () => {
  console.log('loging out');
  cookies().delete('auth-user');
  cookies().delete('token');
  redirect('/auth');
};
