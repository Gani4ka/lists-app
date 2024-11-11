export interface ResetPasswordResponse {
  error: boolean;
  message: string;
}
export type ResetPasswordTypes = {
  resetPassword: (password: string) => Promise<ResetPasswordResponse>;
};
