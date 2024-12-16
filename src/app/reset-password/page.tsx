import { resetPassword } from '@app/api/user';

import ResetPasswordForm from './reset-password-form/ResetPasswordForm';

export default function ResetPasswordPage() {
  return <ResetPasswordForm resetPassword={resetPassword} />;
}
