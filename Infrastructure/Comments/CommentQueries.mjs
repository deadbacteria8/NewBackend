import commentModule from "./CommentModule.mjs";

export default {
    getCommentsByDocId: async (docId) => {
        return await commentModule.find({ document: docId });
    },

    insertComment: async (commentOb) => {
        const comment = new commentModule({comment: commentOb.comment, document: commentOb.docId, line: commentOb.line});
        return await comment.save();
    }
}