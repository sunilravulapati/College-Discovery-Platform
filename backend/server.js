import exp from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import collegeRouter from './apis/collegeRoute.js'
import authRouter from './apis/authRoute.js'
import savedRoute from './apis/savedRoute.js'
import compareRoute from './apis/compareRoute.js'

config();

const app = exp();
//body parser middleware
app.use(exp.json())

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true // Allow cookies to be sent in cross-origin requests
}));
app.use(cookieParser());

//routes
app.use('/api/colleges',collegeRouter)
app.use('/api/auth',authRouter)
app.use('/api/saved',savedRoute)
app.use('/api/compare',compareRoute)

//connect to db - postgreSQL using prisma
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})


//invalid path middleware
app.use((req, res, next) => {
    return res.json({ message: `${req.url} is an invalid path` })
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    // Prisma duplicate error
    if (err.code === "P2002") {
        return res.status(409).json({
            message: "Duplicate field value entered"
        });
    }
    // Prisma record not found
    if (err.code === "P2025") {
        return res.status(404).json({
            message: "Record not found"
        });
    }
    // Custom errors
    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        });
    }
    //send response
    return res.status(500).json({
        message: "Internal server error"
    });
});