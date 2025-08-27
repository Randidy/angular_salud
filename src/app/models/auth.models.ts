export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtAuthenticationResponse {
  accessToken: string;
  tokenType: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  MEDICO = 'ROLE_MEDICO', 
  PACIENTE = 'ROLE_PACIENTE'
}