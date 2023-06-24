import { AuthResponse } from "../models";
import api from "../http";
import {AxiosResponse} from 'axios'


export const login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/user/login', {email, password})
}

export const registration = (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/user/registration', {email, password})
}

export const logout = async (email: string): Promise<AxiosResponse<number>> => {
    return api.post('/user/logout', {email})
}

export const refresh = async (): Promise<AxiosResponse<AuthResponse>> => {
    return api.get<AuthResponse>(`/user/refresh`, {withCredentials: true})
}
