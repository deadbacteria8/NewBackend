import mongoose from 'mongoose';

const commentModule = new mongoose.Schema({
    comment: { type: String, required: true },
    line:  { type: String, required: true },
    document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' }
});

export default mongoose.model('Comment', commentModule);