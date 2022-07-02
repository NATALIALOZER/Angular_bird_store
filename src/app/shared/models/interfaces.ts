export interface User{
  email: string;
  password: string;
  returnSecureToken?: boolean
}

export interface fbAuthResponse{
  displayName?: string;
  email?: string;
  idToken: string;
  kind?: string;
  localId?: string;
  registered?: boolean;
  expiresIn: string;
}

export interface ImageSnippet {
  file?: File;
  src: string;
}

export interface FbCreateResponse {
  id: string;
  name: string;
}

export interface Product {
  id: string,
  name: string,
  description: string,
  price: number,
  imageUrl: string
  quantity?: number;
}

