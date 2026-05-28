import prisma from "../prisma/prisma.js";

export const compareCollegeService = async (collegeIds) => {
  if (!collegeIds || collegeIds.length < 2) {
    const err = new Error(
      "At least 2 colleges must be selected for comparison",
    );
    err.status = 400;
    throw err;
  }
  const colleges = await prisma.college.findMany({
    where: {
      id: {
        in: collegeIds,
      },
    },
    include: {
      placements: true,
      courses: true,
    },
  });
  return colleges;
};
