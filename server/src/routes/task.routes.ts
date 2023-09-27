import { Router } from 'express';
import * as TaskController from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.post('/create', TaskController.createTask);
taskRouter.get('/', TaskController.getAllTasks);
taskRouter.get('/:id', TaskController.getTaskById);
taskRouter.put('/:id', TaskController.updateTask);
taskRouter.delete('/:id', TaskController.deleteTask);

export default taskRouter;
