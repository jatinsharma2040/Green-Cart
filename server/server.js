import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js'
import connectCloudinary from './configs/cloudinary.js';
import productRoute from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

//Connect it with MongoDB with db.js file
await connectDB();

//Connect cloudinary
await connectCloudinary();

//Allow multiple origins like frontend of the project
const allowedOrigins = ['http://localhost:5173','https://greencart-backend-umber.vercel.app'];

//Middeware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req,res) => res.send('API is working'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
});
