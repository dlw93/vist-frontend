export interface IAuthResponse {
    error?: number;
}

export interface IAuthToken {
    token: string;
}

export interface IAuthData {
    id: number;
    expires: Date;
}

export interface IUser {
    username: string;
    firstName: string;
    lastName: string;
}
