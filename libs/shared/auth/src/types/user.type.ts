export enum Role {
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: Role[];
}
