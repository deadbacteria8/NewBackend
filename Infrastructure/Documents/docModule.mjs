import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String},
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const MongoDocument = mongoose.model('Document', documentSchema);


export default MongoDocument;