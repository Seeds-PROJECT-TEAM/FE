export interface User {
  id: string;
  email: string;
  name: string;
  userLevel: "pre-nerd" | "nerd";
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
