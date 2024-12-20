import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import userApplicationLayer from "../../ApplicationLayer/User/UserApplicationLayer.mjs";
import document from "../../ApplicationLayer/Document/document.mjs";
import {DocumentType} from "../Documents/DocumentGraphQL.mjs";

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        documents: {
            type: new GraphQLList(DocumentType),
            async resolve(parent, args) {
                return await document.usersDocuments(parent.id);
            }
        }
    })
});

const userQuery =  {
    type: UserType,
    resolve: (parent, args, context) => {
        return userApplicationLayer.findUser(context.user);
    },
}


export {UserType, userQuery};