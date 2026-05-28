import exp from 'express'
import { compareController } from '../controllers/compareController.js'

const router = exp.Router()

router.post('/',compareController)

export default router;