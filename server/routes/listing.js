import express from 'express';
import { createList } from '../controllers/listingController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router()

router.post('/create',verifyUser,createList)


export default router