import mongoose, { Document, Schema } from 'mongoose';

export interface TaskDocument extends Document {
    author: mongoose.Types.ObjectId;
    title: string;
    project: string;
    priority: string;
    type: string;
    description: string;
    createdAt: Date;
}

const taskSchema = new Schema<TaskDocument>({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    project: { type: String, required: true },
    priority: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export default TaskModel;
