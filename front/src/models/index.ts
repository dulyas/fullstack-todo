export interface IUser {
    id: number
    email: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface UserService {
    login: (email: string, password: string, keepMeCheckBoxValue: boolean) => Promise<void>;
    logout: (email: string) => Promise<void>;
    registration: (email: string, password: string, keepMeCheckBoxValue: boolean) => Promise<void>;
}

export interface TodoType {
    id: number
    title: string
    done: boolean
}