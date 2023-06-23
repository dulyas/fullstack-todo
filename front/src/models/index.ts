export interface IUser {
    id: number
    email: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

