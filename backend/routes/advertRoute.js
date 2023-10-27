import express from "express"
import * as advertController from "../controllers/advertController.js"

const router = express.Router()

router.route('/').get(advertController.getAllAdvertsPage)
router.route('/:id').get(advertController.getAAdvertPage)
router.route('/search').post(advertController.advertSearch)
router.route('/filter').post(advertController.advertFilter)


export default router