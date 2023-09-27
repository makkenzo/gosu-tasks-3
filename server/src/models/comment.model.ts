import { Schema, model, Document, Types } from 'mongoose';

interface CommentDocument extends Document {
    author: Types.ObjectId;
    text: string;
    taskId: Types.ObjectId;
    createdAt: Date;
}

const commentSchema = new Schema<CommentDocument>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    createdAt: { type: Date, default: Date.now },
});

const CommentModel = model<CommentDocument>('Comment', commentSchema);

export default CommentModel;
