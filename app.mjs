
import 'dotenv/config';
const port = process.env.PORT || 1337;
import graphQLWebsocketServer from "./GraphQLWebsocketServer.mjs";
import express from 'express';
import bodyParser from 'body-parser';
import { openConnection, closeConnection } from "./Infrastructure/db/database.mjs";
import morgan from 'morgan';
import userLogin from "./ControllerLayer/User/userREST.mjs";
import graphQLSchema from "./ControllerLayer/GraphQLSchema.mjs";
import authMiddleware from "./ControllerLayer/authMiddleware.mjs";
import {graphqlHTTP} from "express-graphql";
const app = express();
import cors from 'cors';
app.disable('x-powered-by');
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}
const corsOptions = {
    origin: process.env.frontendAddress || 'http://localhost:5173',
    methods: 'GET,POST,PUT',
    allowedHeaders: ['Content-Type', 'token']
};


app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userLogin);
app.use((err, req, res, next) => {
    const errorCode = err.statusCode || 500;
    console.log(err.message);
    res.status(errorCode).send('Error');
});

app.use(authMiddleware);

app.use('/query', graphqlHTTP((req) => ({
    schema: graphQLSchema,
    graphiql: true,
    context: {
        user: req.user.userId
    },
    formatError: (err) => {
        return ({ message: err.message, statusCode: 500 })
    }
})));

const startServer = async () => {
    openConnection().then(() => {
        const server = app.listen(port, () => {
            graphQLWebsocketServer(server);
        });
    });
};

const closeServer = async () => {
    closeConnection().then( () => {
        process.exit(1);
    });
};

export {startServer, closeServer};

export default app;







