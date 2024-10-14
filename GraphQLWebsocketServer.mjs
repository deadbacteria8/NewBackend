import {WebSocketServer} from 'ws';
import graphQLSchema from "./ControllerLayer/GraphQLSchema.mjs";
import {useServer} from "graphql-ws/lib/use/ws";

export default (server) => {
    const ws = new WebSocketServer({
        server,
        path: '/query'
    });
    useServer({ graphQLSchema }, ws);
}

