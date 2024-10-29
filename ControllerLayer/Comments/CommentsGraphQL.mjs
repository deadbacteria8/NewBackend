
import {GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import comments from "../../ApplicationLayer/Comments/comments.mjs";

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        line: { type: GraphQLString }
    })
});

const insertComment = {
    name:'insertComment',
    type: CommentType,
    args: {
        documentId: {type : new GraphQLNonNull(GraphQLString)},
        comment: { type: GraphQLString },
        line: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
        return await comments.insertComment(args.documentId, context.user, args.comment, args.line);
    }
}


export {CommentType, insertComment};