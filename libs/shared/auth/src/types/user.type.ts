import { User as FirebaseUser } from 'firebase/auth';

export enum Role {
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
}

export interface User {
  id: string;
  email: string;
  roles: Role[];
}

export interface UserWithRoles {
  user: FirebaseUser;
  roles: Role[];
}
