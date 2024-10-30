import docs from "../../Infrastructure/Documents/docs.mjs";

import userApplicationLayer from "../User/UserApplicationLayer.mjs";
import createEmailInvite from "../Email/createEmailInvite.mjs";
import documentInviteToken from "../Token/DocumentInviteToken.mjs";
import Email from "../../Infrastructure/Email/Email.mjs";
import documentRules from "./documentRules.mjs";
const document = {

    getDocumentById: async function(id, userId) {
        const user = await userApplicationLayer.findUser(userId);
        if(!(documentRules.userHasAccessToDocument(user, id))) throw new Error("No Access");
        return await docs.getOne(id);
    },


    updateDocument: async (userId, docId, content, title) => {
        const user = await userApplicationLayer.findUser(userId);
        if(!(documentRules.userHasAccessToDocument(user, docId))) throw new Error("No Access");
        return await docs.updateContent(docId, content, title);
    },

    usersDocuments: async (user) => {
        return await docs.findDocumentsAssociatedWithUser(user);
    },

    addUserToDocument: (user, document) => {
        if(!(documentRules.userCanBeAddedToDocument(document, user._id))) {
            throw new Error("User cant be added to Document");
        }
        document.users.push(user._id);
        user.documents.push(document);
    },

    acceptInvite: async (token) => {
        const decoded = documentInviteToken.verifyDocumentInviteToken(token);
        const doc = await docs.getOne(decoded.document);
        const user = await userApplicationLayer.findUser(decoded.user);
        document.addUserToDocument(user, doc);
        await docs.saveDocAndUserSimultaneously(user, doc);
    },

    inviteUsersToDocument: async (users,userIdMakingCall, documentId) => {
        const doc = await docs.getOne(documentId);
        if(!(documentRules.userCanAddUsersToDocument(doc, userIdMakingCall))) throw new Error("Throw new error");
        const promises = users.map(async (id) => {
            const user = await userApplicationLayer.findUserByEmail(id);
            const token = documentInviteToken.createDocumentInviteToken(user, doc);
            const message = createEmailInvite(token, user.email);
            await Email.SendEmail(message);
        });
        await Promise.all(promises);
        return "Invites Sent";
    },

    createDocument: async (title, code, userId) => {
       const user = await userApplicationLayer.findUser(userId);
       if(!(documentRules.userCanCreateDocument(user))) throw new Error("Cannot create Document");
        const newDocument = {
            title: title,
            users: [userId],
            content: '',
            code: code,
        };
        return await docs.addOne(newDocument, user);
    },

    subscribe: async (documentId, userId) => {
        const user = await userApplicationLayer.findUser(userId);
        if(!(documentRules.userHasAccessToDocument(user, documentId))) throw new Error("No Access");
    }
};

export default document;