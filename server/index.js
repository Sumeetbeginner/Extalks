import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Import Routes
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3001;

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });

// User Routes
app.use('/auth', authRoutes);

// Hello Route
app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});
