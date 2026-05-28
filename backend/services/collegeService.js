import prisma from "../prisma/prisma.js";

//service to get all colleges
export const getAllCollegeService = async (query) => {
    const {
        search = "",
        state,
        minFees,
        maxFees,
        sort = "desc",
        page = 1,
        limit = 10
    } = query;

    const whereClause = {
        name: {
            contains: search,
            mode: "insensitive"
        },
        ...(state && {
            state: state
        }),
        ...(minFees || maxFees
            ? {
                fees: {
                    ...(minFees && {
                        gte: Number(minFees)
                    }),

                    ...(maxFees && {
                        lte: Number(maxFees)
                    })
                }
            }
            : {}
        )
    };
    const colleges = await prisma.college.findMany({
        where: whereClause,
        orderBy: {
            rating: sort
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit)
    });
    const total = await prisma.college.count({
        where: whereClause
    });

    return {
        colleges,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

//service to get the college by id
export const getCollegeByIdService = async (id) => {
    const college = await prisma.college.findUnique({
        where: {
            id
        },
        include: {
            courses: true,
            placements: true,
            reviews: true
        }
    });
    return college;
};