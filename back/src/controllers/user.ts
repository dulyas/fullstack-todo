
import { Result, ValidationError, validationResult } from "express-validator"
import ApiError from "@/exceptions/api-error"
import { NextFunction, Request, Response } from 'express';
import { User } from "@/models";
import * as userService from '@/services/user'

export const registration = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
        }

        const {email, password} = req.body

        const userData = await userService.registration(email, password)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.json(userData)
    } catch (e) {
        next(e)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {email, password} = req.body
        const userData = await userService.login(email, password)

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.json(userData)
    } catch (e){

        next(e)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req)
        const {refreshToken} = req.cookies
        const token = await userService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
    } catch (e){
        next(e)
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken} = req.cookies
        // console.log('refreshtoken',refreshToken)
        const userData = await userService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.json(userData)
    } catch (e){
        next(e)
    }
}


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const users = await User.query()

        console.log(users)

        return res.json(users)

    } catch (e){
        next(e)
    }
}
