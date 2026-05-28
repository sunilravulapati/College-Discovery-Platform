import {getAllCollegeService, getCollegeByIdService} from '../services/collegeService.js'

//controller to get all colleges
export const getColleges = async (req, res, next) => {
    try {
        const result = await getAllCollegeService(req.query);
        return res.status(200).json({
            message: "fetched all colleges successfully",
            ...result
        });
    } catch (err) {
        next(err);
    }
};

//controller to get the college by id
export const getCollegeById = async (req,res,next) => {
    try{
        const college = await getCollegeByIdService(req.params.id)
        //send res
        return res.status(200).json({message:"fetched the college successfully",data:college})
    }catch(error){
        next(error);
    }
}