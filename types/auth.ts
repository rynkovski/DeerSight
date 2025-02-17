
export interface AuthError {
  message: string;
}

export interface AuthState {
  loading: boolean;
  error: AuthError | null;
}