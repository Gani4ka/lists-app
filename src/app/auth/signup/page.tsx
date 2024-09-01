import SignUp from './SignUp';

export default async function Page() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <SignUp />
    </div>
  );
}
