import docs from "../../Infrastructure/Documents/docs.mjs";

import userApplicationLayer from "../User/UserApplicationLayer.mjs";
const document = {

    getDocumentById: async function(id) {
        return await docs.getOne(id);
    },


    updateDocument: async (userId, docId, content) => {
        const user = userApplicationLayer.findUser(userId);
        if(!(user.documents.includes(docId))) {
            throw new Error("Not authorized");
        }
        return await docs.updateContent(docId, content);
    },

    usersDocuments: async (user) => {
        return await docs.findDocumentsAssociatedWithUser(user);
    },

    addUserToDocument: (user, document) => {
        if (document.users.includes(user._id)) {
            throw new Error("User already exists");
        }
        document.users.push(user._id);
        user.documents.push(document);
    },

    addUsersToDocument: async (users,userIdMakingCall, documentId) => {
        const doc = await docs.getOne(documentId);
        document.accessToDoc(doc, userIdMakingCall);
        const promises = users.map((id) => {
            return new Promise(async (resolve) => {
                const user = await userApplicationLayer.findUser(id);
                document.addUserToDocument(user, doc);
                resolve();
            });
        });
        //We want to simulate everything at the sametime for faster results.
        await Promise.all(promises);
        return await docs.saveDocAndUsersSimultaneously(doc, users);
    },

    createDocument: async (title, userId) => {
       const user = await userApplicationLayer.findUser(userId);
       if (!user) {
           throw new Error("User doesnt exists");
       }
        const newDocument = {
            title: title,
            users: [userId],
            content: '',
        };
        return await docs.addOne(newDocument, user);
    },

    accessToDoc: (doc, userId) => {
        if(!(doc.users.includes(userId))) {
            throw new Error("Not Access to add users");
        }
    },
    subscribe: async (documentId, userId) => {
        const doc = await docs.getOne(documentId);
        document.accessToDoc(doc, userId);
    }
};

export default document;