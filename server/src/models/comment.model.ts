import mongoose, { Document, Schema } from 'mongoose';

export interface CommentDocument extends Document {
    author: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
}

const commentSchema = new Schema<CommentDocument>({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model<CommentDocument>('Comment', commentSchema);

export default CommentModel;
