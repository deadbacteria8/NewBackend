import userQueries from "../../Infrastructure/User/userQueries.mjs";

export default {
    usersWithinDocument : async (documentId) => {
        return await userQueries.findUsersAssociatedWithDocument(documentId);
    },
    findUser : async (id) => {
        return await userQueries.findUserWithId(id);
    },

    userHasAccessToDocument : async (id, documentId) => {
        const user = await userQueries.findUserWithId(id);
        return user.documents.includes(documentId);
    }
}