export interface IAuth {
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    password: string;
  }


export interface ILogin {
    email: string;
    password: string;
  }

export interface IAdminState {
    isLoading: boolean;
    users: string[] | null | undefined;
    trainers: string[] | null | undefined;
    tags: string[] | null | undefined;
}