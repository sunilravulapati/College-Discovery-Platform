import prisma from "../prisma/prisma.js";

export const saveCollegeService = async (userId, collegeId) => {
    const check = await prisma.savedCollege.findFirst({
        where:{
            userId,
            collegeId
        }
    })
    if(check){
        const err = new Error("College already saved")
        err.status = 409
        throw err;
    }
    const saved = await prisma.savedCollege.create({
        data:{
            userId,
            collegeId
        }
    })
    return saved;
}

export const getSavedCollegesService = async (userId) => {
    const savedColleges = await prisma.savedCollege.findMany({
        where:{
            userId
        },
        include:{
            college:true
        }
    })
    return savedColleges;
}

export const removeSavedCollegeService = async (userId, collegeId) => {
    await prisma.savedCollege.deleteMany({
        where:{
            userId,
            collegeId
        }
    })
}