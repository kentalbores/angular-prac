export interface PlatformAccount {
  row_number: number;
  id: string;
  platform: string;
  username: string;
  password?: string;
}

export interface CreateAccountRequest {
  platform: string;
  username: string;
  passsword: string;
}

export interface GetPlatformAccountsRequest {
  platform: string;
}

export interface CreateAccountResponse {
  message: string;
}
