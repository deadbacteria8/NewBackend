    import userQueries from "../../Infrastructure/User/userQueries.mjs";

export default {
    usersWithinDocument : async (documentId) => {
        return await userQueries.findUsersAssociatedWithDocument(documentId);
    },
    findUser : async (id) => {
        return await userQueries.findUserWithId(id);
    },

    findUserByEmail : async (email) => {
        return await userQueries.findUserWithEmail(email);
    },
}