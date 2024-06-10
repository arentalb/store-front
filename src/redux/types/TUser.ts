export interface TUser {
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
}

export interface TUserDetail {
  _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  active: boolean;
}
