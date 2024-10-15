import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";
import userApplicationLayer from "../../ApplicationLayer/User/UserApplicationLayer.mjs";
import document from "../../ApplicationLayer/Document/document.mjs";
import {UserType} from "../User/userGraphQL.mjs";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();


const DocumentType = new GraphQLObjectType({
    name: 'Document',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        title: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return await userApplicationLayer.usersWithinDocument(parent.id);
            }
        }
    })
});



const documentQuery = {
    type: DocumentType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: (parent, args, context) => {
        return document.getDocumentById(args.id, context.user);
    },};

const createDocument = {
    type: DocumentType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args, context) {
        // Create a new document in the database
        return await document.createDocument(args.title, context.user);
    }
};

const addUsers = {
    type: DocumentType,
    args: {
        users: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        documentId: {type : new GraphQLNonNull(GraphQLString)}
    },
    async resolve(parent, args, context) {
        // Create a new document in the database
        return await document.addUsersToDocument(args.users, context.user,args.documentId);
    }
};

const updateDocument = {
    type: DocumentType,
    args: {
        content: {type : new GraphQLNonNull(GraphQLString)},
        document: {type : new GraphQLNonNull(GraphQLString)}
    },
    async resolve(parent, args, context) {
        const doc = await document.updateDocument(context.user, args.document, args.content);
        pubsub.publish(args.document, doc.content);
        return doc;
    }
};

const contentSubscription = {
    type: DocumentType,
    args: {
        documentId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
    },
    subscribe: async (parent, args) => {
        await document.subscribe(args.documentId, args.userId);
        return pubsub.asyncIterator(args.documentId);
    }
};

export {DocumentType, documentQuery, createDocument, addUsers, updateDocument, contentSubscription};

