export interface UserPayload {
  id: string;
  username: string;
  role: string;
}

export interface JtwPayload {
  sub: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface UserToken {
  accessToken: string;
}
