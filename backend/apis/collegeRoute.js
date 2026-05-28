import exp from 'express'
import {getColleges, getCollegeById} from '../controllers/collegeController.js'
//mini express server
const router = exp.Router();

//fetch the colleges
router.get('/',getColleges)
//fetch single college by id
router.get(":id",getCollegeById)


export default router;