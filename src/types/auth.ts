export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  grade: string;
  character: string;
  agreeToTerms: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  userLevel: 'pre-nerd' | 'nerd';
  character: string;
  grade: string;
  level: number;
  exp: number;
  maxExp: number;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}