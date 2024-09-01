'use client';
export default function AuthForm() {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <a href="/auth/login">Login with email and password</a>
      <a href="/auth/signup">Sign up here</a>
    </div>
  );

  return content;
}
