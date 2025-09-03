import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export {app};