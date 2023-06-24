import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";


import { createTodo, getTodosByUserId, updateTodoTitle, updateTodoDone, deleteTodo } from "@/controllers/todo";


const router = Router()


router.get('/todo/', authMiddleware , (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'get Todos for user'
    /* #swagger.parameters['user_id'] = {
    description: 'user_id',
    type: 'number',
    required: true
    } */
    /* #swagger.parameters['limit'] = {
    description: 'limit users for pagination',
    type: 'number',
    required: false
    } */
    /* #swagger.parameters['offset'] = {
    description: 'offset for limit for pagination',
    type: 'number',
    required: false
    } */
    /* #swagger.responses[200] = {
    description: 'Todos',
    schema: { $ref: '#/definitions/Todos' }
    } */
    getTodosByUserId(req, res, next)
})
router.post('/todo/createTodo', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    
    // #swagger.description = 'Create Todo for user'
    /* #swagger.parameters['user_id'] = {
    in: 'body',
    description: 'user_id of creator',
    type: 'number',
    required: true,
    } */
    /* #swagger.parameters['title'] = {
    in: 'body',
    description: 'Title for todo',
    type: 'number',
    required: true,
    } */
    /* #swagger.responses[200] = {
    description: 'new Todo',
    schema: { $ref: '#/definitions/Todo' }
    } */

    createTodo(req, res, next)
})
router.post('/todo/updateTodoTitle', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'update Todo title for user'
        /* #swagger.parameters['user_id'] = {
        in: 'body',
        description: 'user_id of creator',
        type: 'number',
        required: true,
        } */
        /* #swagger.parameters['title'] = {
        in: 'body',
        description: 'Title for todo',
        type: 'number',
        required: true,
        } */
        /* #swagger.responses[200] = {
        description: 'new Todo',
        schema: { $ref: '#/definitions/Todo' }
        } */

        updateTodoTitle(req, res, next)
    }
)
router.post('/todo/updateTodoDone', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'update Todo title for user'
    /* #swagger.parameters['user_id'] = {
    in: 'body',
    description: 'user_id of creator',
    type: 'number',
    required: true,
    } */
    /* #swagger.parameters['done'] = {
    in: 'body',
    description: 'new done status for todo',
    type: 'number',
    required: true,
    } */
    /* #swagger.responses[200] = {
    description: 'new Todo',
    schema: { $ref: '#/definitions/Todo' }
    } */

    updateTodoDone(req, res, next)
})
router.post('/todo/deleteTodo', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
        
    // #swagger.description = 'delete Todo for user'
    /* #swagger.parameters['user_id'] = {
    in: 'body',
    description: 'user_id of creator',
    type: 'number',
    required: true,
    } */
    /* #swagger.responses[200] = {
    description: 'number of deleted todos (must be 1)',
    schema: { count: 1 }
    } */
    deleteTodo(req, res, next)
})



export default router;