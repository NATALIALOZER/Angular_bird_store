export interface fbAuthResponse {
  displayName?: string;
  email?: string;
  idToken: string;
  kind?: string;
  localId?: string;
  registered?: boolean;
  expiresIn: string;
}
