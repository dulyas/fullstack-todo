

import ApiError from "@/exceptions/api-error"
import { NextFunction, Request, Response } from 'express';
import * as todoService from '@/services/todo'

export const getTodosByUserId = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {user_id, limit = 5, offset = 0} = req.query

        if (!user_id || typeof +user_id !== 'number') return next(ApiError.BadRequest('Некорректный user id') )

        const todos  = await todoService.getTodosByUserId(+user_id, +limit, +offset)


        return res.json(todos)

    } catch (e) {
        next(e)
    }
}

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user_id, title} = req.body

        if (!user_id || !title || typeof +user_id !== 'number' || typeof title !== 'string' || title.length > 30) return next(ApiError.BadRequest('Некорректные данные, user_id: number, title: string не длиннее 30') )

        const todo = await todoService.createTodo(+user_id, title)


        return res.json(todo)

    } catch (e) {
        next(e)
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.body

        if (!id || typeof +id !== 'number') return next(ApiError.BadRequest('Некорректные данные, id должен быть числом') )

        const count = await todoService.deleteTodo(id)

        return res.json(count)

    } catch (e) {
        next(e)
    }
}

export const updateTodoTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id, title} = req.body

        if (!id || typeof +id !== 'number' || !title || typeof title !== 'string' || title.length > 30) return next(ApiError.BadRequest('Некорректные данные, id должен быть числом, title - строкой короче 30') )

        const todo = await todoService.updateTodoTitle(id, title)

        return res.json(todo)

    } catch (e) {
        next(e)
    }
}

export const updateTodoDone = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {id, done} = req.body

        if (!id || typeof +id !== 'number') return next(ApiError.BadRequest('Некорректные данные, id должен быть числом') )

        const todo = await todoService.updateTodoDone(id, done)

        return res.json(todo)

    } catch (e) {
        next(e)
    }
}