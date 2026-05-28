import {compareCollegeService} from '../services/compareService.js'

export const compareController = async (req,res,next) => {
    try{
        const result = await compareCollegeService(req.body.collegeIds)
        return res.status(200).json({message:"colleges compared",data:result})
    }catch(err){
        next(err)
    }
}