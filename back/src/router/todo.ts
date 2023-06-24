import { Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";


import { createTodo, getTodosByUserId, updateTodoTitle, updateTodoDone, deleteTodo } from "@/controllers/todo";


const router = Router()


router.get('/', authMiddleware ,getTodosByUserId)
router.post('/createTodo', authMiddleware, createTodo)
router.post('/updateTodoTitle', authMiddleware, updateTodoTitle)
router.post('/updateTodoDone', authMiddleware, updateTodoDone)
router.post('/deleteTodo', authMiddleware, deleteTodo)



export default router;