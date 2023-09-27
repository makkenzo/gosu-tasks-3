import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.post('/create', CommentController.createComment);
commentRouter.get('/', CommentController.getAllComments);
commentRouter.get('/:id', CommentController.getCommentById);
// commentRouter.put('/:id', CommentController.updateComment);
commentRouter.delete('/:id', CommentController.deleteComment);

export default commentRouter;
