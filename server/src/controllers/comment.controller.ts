import { Request, Response } from 'express';
import CommentModel from '../models/comment.model';

export const createComment = async (req: Request, res: Response) => {
    try {
        const { author, text, taskId } = req.body;

        if (!author || !text || !taskId) {
            return res.status(400).json({ message: 'Author, text, and taskId are required' });
        }

        const comment = new CommentModel({
            author,
            text,
            taskId,
        });

        await comment.save();

        return res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await CommentModel.find();
        return res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id;
        const comment = await CommentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        return res.status(200).json(comment);
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// export const updateComment = async (req: Request, res: Response) => {
//     try {
//         const commentId = req.params.id;
//         const updateData = req.body;

//         const updatedComment = await CommentModel.findByIdAndUpdate(commentId, updateData, { new: true });

//         if (!updatedComment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         return res.status(200).json(updatedComment);
//     } catch (error) {
//         console.error('Error updating comment:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id;

        const deletedComment = await CommentModel.findByIdAndRemove(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        return res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
