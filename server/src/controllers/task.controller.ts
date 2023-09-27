import { Request, Response } from 'express';
import TaskModel from '../models/task.model';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { author, title, project, priority, type, description } = req.body;

        // Проверка наличия обязательных полей
        if (!author || !title || !project || !priority || !type || !description) {
            return res
                .status(400)
                .json({ message: 'Author, title, project, priority, type, and description are required' });
        }

        const task = new TaskModel({
            author, // Здесь предполагается, что `author` - это OID пользователя
            title,
            project,
            priority,
            type,
            description,
        });

        await task.save();

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
