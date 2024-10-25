import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import comments from "../../ApplicationLayer/Comments/comments.mjs";

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        line: { type: GraphQLInt }
    })
});

const insertComment = new GraphQLObjectType({
    name: 'InsertComment',
    type: CommentType,
    args: {
        documentId: {type : new GraphQLNonNull(GraphQLString)},
        comment: { type: GraphQLString },
        line: { type: GraphQLInt }
    },
    async resolve(parent, args, context) {
        return await comments.insertComment(args.documentId, context.user, args.comment, args.line);
    }

})


export {CommentType, insertComment};