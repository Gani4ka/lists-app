import { User } from '@app/types/list.types';

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
export async function signinUser(user: User) {
  try {
    const signInRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return signInRes;
  } catch (err) {
    console.log('error', err);
  }
}
