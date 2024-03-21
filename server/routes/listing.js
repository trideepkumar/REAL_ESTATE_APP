import express from 'express';
import { createList,deleteList } from '../controllers/listingController.js';
import { verifyUser } from '../middlewares/verifyUser.js';


const router = express.Router()

router.post('/create',verifyUser,createList)
router.delete('/deleteList/:id',verifyUser,deleteList)



export default router