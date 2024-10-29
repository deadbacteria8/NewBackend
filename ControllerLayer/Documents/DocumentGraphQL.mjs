import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";
import userApplicationLayer from "../../ApplicationLayer/User/UserApplicationLayer.mjs";
import document from "../../ApplicationLayer/Document/document.mjs";
import {UserType} from "../User/userGraphQL.mjs";
import { PubSub } from "graphql-subscriptions";
import {CommentType} from "../Comments/CommentsGraphQL.mjs";
import comments from "../../ApplicationLayer/Comments/comments.mjs";

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
            },
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve(parent, args) {
                return await comments.commentsWithinDocument(parent.id);
            }
        }
    })
});

const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    fields: () => ({
        Document: { type:  new GraphQLNonNull(DocumentType) },
        userIdMakingChange: { type: new GraphQLNonNull(GraphQLString) }
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
        return await document.createDocument(args.title, context.user);
    }
};

const inviteUsers = {
    type: new GraphQLNonNull(GraphQLString),
    args: {
        users: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        documentId: {type : new GraphQLNonNull(GraphQLString)}
    },
    async resolve(parent, args, context) {
        return await document.inviteUsersToDocument(args.users, context.user,args.documentId);
    }
};



const updateDocument = {
    type: DocumentType,
    args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        document: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args, context) {
        try {
            const doc = await document.updateDocument(context.user, args.document, args.title, args.content);
            const comments = await comments.commentsWithinDocument(args.document);
            pubsub.publish(args.document, {
                contentSubscription: {
                    Document: {
                        id: doc.id,
                        title: doc.title,
                        content: doc.content,
                        comments: comments
                    },
                    userIdMakingChange: context.user
                }
            });
            return doc;
        } catch (error) {
            console.error("Error updating document:", error);
            throw new Error("Failed to update document");
        }
    }
};

const contentSubscription = {
    type: SubscriptionType,
    args: {
        documentId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
    },
    subscribe: async (parent, args) => {
        await document.subscribe(args.documentId, args.userId);
        return pubsub.asyncIterator(args.documentId);
    }
};

export {DocumentType, documentQuery, createDocument, inviteUsers, updateDocument, contentSubscription};

