export interface ResetPasswordResponse {
  error: boolean;
  message: string;
}
export type ResetPasswordTypes = {
  resetPassword: (email: string) => Promise<ResetPasswordResponse>;
};
