export default {
    userHasAccessToDocument: (user, id) => {
        return user.documents.includes(id);
    },

    userCanBeAddedToDocument: (document, userId) => {
        return (!(document.users.includes(userId)));
    },

    userCanCreateDocument: (user) => {
        return user !== undefined;
    },

    userCanAddUsersToDocument: (document, userId) => {
        return document.users.includes(userId);
    }

}