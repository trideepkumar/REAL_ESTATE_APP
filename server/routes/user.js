import express from 'express'
import { test, updateUser } from '../controllers/userController.js'
import { verifyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

router.get('/test-api', test)
router.post('/update/:id',verifyUser,updateUser)

export default router