import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Define your type definitions (schema)
const server = new ApolloServer({});

const url = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url.url}`);