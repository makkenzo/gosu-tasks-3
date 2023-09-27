import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import taskRouter from './routes/task.routes';
import commentRouter from './routes/comment.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongodbUri = process.env.MONGODB_URI || '';
mongoose.connect(mongodbUri);

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/comments', commentRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
