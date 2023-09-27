import { Request, Response } from 'express';
import TaskModel from '../models/task.model';

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        console.error('Error fetching task by ID:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { author, title, project, priority, type, description } = req.body;

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

        return res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await TaskModel.findByIdAndRemove(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(204).send(); // 204 No Content
    } catch (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
