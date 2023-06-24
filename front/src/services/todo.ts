import { AuthResponse, TodoType } from "../models";
import api from "../http";
import {AxiosResponse} from 'axios'


export const getTodosByUserId = async (user_id: number, limit: number = 5, offset: number = 0): Promise<AxiosResponse<TodoType[]>> => {
    return api.get<TodoType[]>(`/todo/?user_id=${user_id}&limit=${limit}&offset=${offset}`)
}

export const createTodo = async (user_id: number, title: string): Promise<AxiosResponse<TodoType>> => {
    return api.post<TodoType>('/todo/createTodo', {user_id, title})
}

export const updateTodoTitle = async (id: number, title: string): Promise<AxiosResponse<TodoType>> => {
    return api.post<TodoType>('/todo/updateTodoTitle', {id, title})
}

export const updateTodoDone = async (id: number, done: boolean | 1 | 0): Promise<AxiosResponse<TodoType>> => {
    return api.post<TodoType>('/todo/updateTodoDone', {id, done})
}

export const deleteTodo = async (id: number): Promise<AxiosResponse<TodoType>> => {
    return api.post<TodoType>('/todo/deleteTodo', {id})
}
