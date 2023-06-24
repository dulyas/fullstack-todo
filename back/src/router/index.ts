
import { Router } from "express";
import user from './user'
import todo from './todo'

const router = Router()

router.use('', user)
router.use('', todo)


export default router