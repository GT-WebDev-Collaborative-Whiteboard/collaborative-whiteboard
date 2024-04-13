import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import whiteboardRoutes from './routes/whiteboardRoutes.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/users', userRoutes);
app.use('/whiteboards', whiteboardRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
