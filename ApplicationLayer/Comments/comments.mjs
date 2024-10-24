import commentQueries from "../../Infrastructure/Comments/CommentQueries.mjs";
import userApplicationLayer from "../User/UserApplicationLayer.mjs";
import documentRules from "../Document/documentRules.mjs";


export default {
    commentsWithinDocument: async  (docId) => {
        return await commentQueries.getCommentsByDocId(docId);
    },

    insertComment: async (docId, userId, comment, line) => {
        const user = await userApplicationLayer.findUser(userId);
        if(!(documentRules.userHasAccessToDocument(user, docId))) throw new Error("No Access");
        return await commentQueries.insertComment({docId, comment, line});
    }
}