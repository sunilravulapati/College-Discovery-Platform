import exp from 'express'
import verifyToken from '../middleware/verifyToken.js'
import {saveCollege,getSavedColleges,removeSavedCollege} from '../controllers/saveController.js'

const router = exp.Router()

//save college
router.post('/:collegeId',verifyToken,saveCollege)
//get all saved colleges
router.get('/',verifyToken,getSavedColleges)
//remove saved college
router.delete('/:collegeId',verifyToken,removeSavedCollege)

export default router
