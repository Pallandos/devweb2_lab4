import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/schema.js";
import { resolvers } from "./src/resolvers.js";

// Define your type definitions (schema)
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const url = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url.url}`);