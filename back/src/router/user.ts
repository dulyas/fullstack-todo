import { Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";
import { body } from "express-validator";
import { getUsers, registration, login, logout, refresh } from "@/controllers/user";


const router = Router()


router.get('/', getUsers)



router.post('/registration',
    body('email').isEmail().isLength({min: 6, max: 50}),
    body('password').isLength({min: 6, max: 50}),
    registration)

router.post('/login', login)
router.post('/logout', logout)
router.get('/refresh', refresh)



export default router;