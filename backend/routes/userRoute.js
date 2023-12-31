import express from "express"
import * as userController from "../controllers/userController.js"



const router = express.Router()

router.route('/register').post(userController.createUser)
router.route('/login').post(userController.loginUser)
router.route('/:id').get(userController.getAUserPage)



export default router