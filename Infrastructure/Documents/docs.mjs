
import DocModule from "./docModule.mjs";
import mongoose from "mongoose";
const docs = {

    getOne: async (id) => {
        return await DocModule.findById(id);
    },

    addOne: async (docOb,user) => {
        const document = new DocModule({ title: docOb.title, content:docOb.content, users: docOb.users });
        user.documents.push(document._id);
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            await user.save()
            await document.save();
            await session.commitTransaction();
            return document;
        } catch (error) {
            console.log(error.message);
            await session.abortTransaction();
            throw new Error("Could not create document");
        } finally {
            session.endSession();
        }
    },


    updateContent: async (id, content, title) => {
        const doc = await DocModule.findById(id);
        //The object parameter can potentially have multiple keys. We dont know the key(s) that exist in the object.
        //therefore we need to update the mongo-document accordingly, only updating the key(s) that is provided in the object
        doc.content = content;
        doc.title = title;
        await doc.save();
        return doc;
    },


    saveDocAndUserSimultaneously: async (doc,user) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            await session.commitTransaction();
            await user.save();
            await doc.save();
            return doc;
        } catch {
            await session.abortTransaction();
            throw new Error("Could not update document");
        } finally {
            session.endSession();
        }
    },

    findDocumentsAssociatedWithUser: async (user) => {
        const _id = new mongoose.Types.ObjectId(user);
        return await DocModule.find({ users: _id });
    },

};

export default docs;