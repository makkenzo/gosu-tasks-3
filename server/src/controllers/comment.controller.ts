import { Request, Response } from 'express';
import CommentModel from '../models/comment.model';

export const createComment = async (req: Request, res: Response) => {
    try {
        const { author, text } = req.body;

        if (!author || !text) {
            return res.status(400).json({ message: 'Author and text are required' });
        }

        const comment = new CommentModel({
            author, // Здесь предполагается, что `author` - это ID пользователя
            text,
        });

        await comment.save();

        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
