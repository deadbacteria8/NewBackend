import {userQuery} from "./User/userGraphQL.mjs";
import {documentQuery, createDocument, contentSubscription, inviteUsers,updateDocument} from "./Documents/DocumentGraphQL.mjs";
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {insertComment} from "./Comments/CommentsGraphQL.mjs";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: userQuery,
        document: documentQuery
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createDocument: createDocument,
        updateDocument: updateDocument,
        inviteUsers: inviteUsers,
        insertComment: insertComment,
    }
});

const subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        contentSubscription: contentSubscription
    }
});



export default new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
    subscription: subscription
});
