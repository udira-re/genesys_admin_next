export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  attributes: {
    nickname: string;
    dateOfBirth: string;
    status: string;
  };

  vatNumber?: string;
  fiscalCode?: string;
  role?: string[];
  profile: {
    balance: number;
    gcoin: number;
  };

  name: string;
  hubs?: { id: string; name: string }[];
}

export interface IUserListResponse {
  users: IUser[];
  total: number;
  page: number;
  limit: number;
}
