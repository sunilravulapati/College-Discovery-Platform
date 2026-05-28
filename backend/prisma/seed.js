import prisma from "./prisma.js";

async function main() {

    await prisma.college.createMany({
        data: [

            {
                name: "IIT Hyderabad",
                slug: "iit-hyderabad",
                location: "Hyderabad",
                state: "Telangana",
                fees: 240000,
                rating: 4.8,
                description: "Top engineering institute"
            },

            {
                name: "NIT Warangal",
                slug: "nit-warangal",
                location: "Warangal",
                state: "Telangana",
                fees: 180000,
                rating: 4.6,
                description: "Premier NIT"
            },

            {
                name: "BITS Pilani",
                slug: "bits-pilani",
                location: "Pilani",
                state: "Rajasthan",
                fees: 450000,
                rating: 4.9,
                description: "Top private engineering institute"
            },

            {
                name: "VIT Vellore",
                slug: "vit-vellore",
                location: "Vellore",
                state: "Tamil Nadu",
                fees: 300000,
                rating: 4.4,
                description: "Private engineering college"
            }

        ]
    });

    console.log("Database Seeded Successfully");
}

main()
.catch((err) => {
    console.log(err);
})
.finally(async () => {
    await prisma.$disconnect();
});