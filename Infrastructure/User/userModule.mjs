import mongoose from 'mongoose';

const userModule = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password:  { type: String, required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

export default mongoose.model('User', userModule);