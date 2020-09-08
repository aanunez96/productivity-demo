const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging');
const { AccountsModule } = require('@accounts/graphql-api');

const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const port = 3000;

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connection succesful")).catch(err => console.error("Error connection MongoDB"));

/** Apollo server **/
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

/** Acocount-js**/
const {accountsServer}  = require('./accounts-js');
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
    resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
    schemaDirectives: {
        ...accountsGraphQL.schemaDirectives,
    },
});

const server = new ApolloServer({ schema, context: accountsGraphQL.context });

server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`Example app listening at http://localhost:${port}`));
