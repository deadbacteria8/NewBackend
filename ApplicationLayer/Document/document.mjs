import docs from "../../Infrastructure/Documents/docs.mjs";

import userApplicationLayer from "../User/UserApplicationLayer.mjs";
import createEmailInvite from "../Email/createEmailInvite.mjs";
import documentInviteToken from "../Token/DocumentInviteToken.mjs";
import Email from "../../Infrastructure/Email/Email.mjs";
const document = {

    getDocumentById: async function(id, userId) {
        const user = await userApplicationLayer.findUser(userId);
        document.authorize(user, id);
        console.log(id);
        console.log(await docs.getOne(id));
        return await docs.getOne(id);
    },
    authorize: (user, id) => {
        if(!(user.documents.includes(id))) {
            throw new Error("Not authorized");
        }

    },
    updateDocument: async (userId, docId, content) => {
        const user = await userApplicationLayer.findUser(userId);
        document.authorize(user, docId);
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
    acceptInvite: async (token) => {
        const decoded = documentInviteToken.verifyDocumentInviteToken(token);
        console.log(decoded)
        const doc = await docs.getOne(decoded.document);
        console.log(decoded.document);
        console.log(doc);
        const user = await userApplicationLayer.findUser(decoded.user);
        document.addUserToDocument(user, doc);
        await docs.saveDocAndUserSimultaneously(user, doc);
    },
    inviteUsersToDocument: async (users,userIdMakingCall, documentId) => {
        const doc = await docs.getOne(documentId);
        document.accessToDoc(doc, userIdMakingCall);

        const promises = users.map(async (id) => {
            const user = await userApplicationLayer.findUserByEmail(id);
            const token = documentInviteToken.createDocumentInviteToken(user, doc);
            const message = createEmailInvite(token, user.email);
            await Email.SendEmail(message);
        });
        await Promise.all(promises);
        return "Invites Sent";


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
        console.log(doc)
        console.log(userId)
        if(!(doc.users.includes(userId))) {
            throw new Error("Not Access to add users");
        }
        console.log("Passed this stage");
    },
    subscribe: async (documentId, userId) => {
        const doc = await docs.getOne(documentId);
        document.accessToDoc(doc, userId);
    }
};

export default document;