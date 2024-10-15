
import DocModule from "./docModule.mjs";
import userModule from "../User/userModule.mjs";
import MongoDocumentHelper from "../mongoDocumentHelper.mjs";
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


    updateContent: async (id, content) => {
        const doc = await DocModule.findById(id);
        //The object parameter can potentially have multiple keys. We dont know the key(s) that exist in the object.
        //therefore we need to update the mongo-document accordingly, only updating the key(s) that is provided in the object
        doc.content = content;
        await doc.save();
        return doc;
    },


    saveDocAndUsersSimultaneously: async (doc,users) => {
        const session = await mongoose.startSession();
        const promises = users.map((user) => {
            return new Promise(async (resolve) => {
                await user.save();
                resolve();
            })
        })
        try {
            session.startTransaction();
            await session.commitTransaction();
            await promises;
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

    updateDocumentWithDocumentInput: async (mongoDocument) => {
        await mongoDocument.save();
        return mongoDocument;
    }
};

export default docs;