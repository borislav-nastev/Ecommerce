import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productsRouter.js';
import brandRouter from './routes/brandRouter.js';
import orderRouter from './routes/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors());

app.use('/user', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', brandRouter);
app.use('/api', orderRouter);

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MongoDB');
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
