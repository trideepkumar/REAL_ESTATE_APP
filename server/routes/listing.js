import express from 'express';
import { createList,deleteList,updateList,getListing} from '../controllers/listingController.js';
import { verifyUser } from '../middlewares/verifyUser.js';


const router = express.Router()

router.post('/create',verifyUser,createList)
router.delete('/deleteList/:id',verifyUser,deleteList)
router.post('/update/:id',verifyUser,updateList)
router.get('/getList/:id',getListing)



export default router