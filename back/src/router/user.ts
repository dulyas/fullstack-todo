
import authMiddleware from "@/middleware/auth-middleware";
import { body } from "express-validator";
import { getUsers, registration, login, logout, refresh } from "@/controllers/user";
import { NextFunction, Request, Response, Router } from "express";

const router = Router()


router.get('/user/', getUsers)



router.post('/user/registration',
    body('email').isEmail().isLength({min: 6, max: 50}),
    body('password').isLength({min: 6, max: 50}),
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'Register New User'
        /* #swagger.parameters['email'] = {
        description: 'user email',
        type: 'string',
        required: true
        } */
        /* #swagger.parameters['password'] = {
        description: 'user password',
        type: 'string',
        required: true
        } */
        /* #swagger.responses[200] = {
        description: 'User with Refresh and Acess tokens',
        schema: { $ref: '#/definitions/UserWithTokens' }
        } */
        registration(req, res, next)
    })

router.post('/user/login', (req: Request, res: Response, next: NextFunction) => {
    
    // #swagger.description = 'User Login'
    /* #swagger.parameters['email'] = {
    description: 'user email',
    type: 'string',
    required: true
    } */
    /* #swagger.parameters['password'] = {
    description: 'user password',
    type: 'string',
    required: true
    } */
    /* #swagger.responses[200] = {
    description: 'User with Refresh and Acess tokens',
    schema: { $ref: '#/definitions/UserWithTokens' }
    } */
    login(req, res, next)
})
router.post('/user/logout', (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'User Logout'
    logout(req, res, next)
})
router.get('/user/refresh', (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'Refresh token'
    refresh(req, res, next)
})



export default router;