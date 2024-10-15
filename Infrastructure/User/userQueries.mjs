import userModule from "./userModule.mjs";
import mongoose from "mongoose";

export default {

    findUserWithEmail: async (email) => {
        return await userModule.findOne({ email: email });
    },

    createUser: async(email, password, documents) => {
        const newDocument = new userModule({
            email: email,
            password: password,
            documents: documents
        });
        await newDocument.save();
    },

    findUsersAssociatedWithDocument: async (document) => {
        const _id = new mongoose.Types.ObjectId(document);
        return await userModule.find({ documents: _id });
    },

    findUserWithId: async (id) => {
        return await userModule.findById(id);
    }
}