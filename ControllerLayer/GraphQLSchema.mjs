import {userQuery} from "./User/userGraphQL.mjs";
import {documentQuery, createDocument, contentSubscription, addUsers,updateDocument} from "./Documents/DocumentGraphQL.mjs";
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

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
        addUsers: addUsers,
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
