export type UserRole = 'ADMIN' | 'PI' | 'SCHOLAR' | 'TECHNICIAN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  designation: string;
  avatarUrl: string;
  phone?: string;
  isActive: boolean;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}
