import { createServer } from 'http'; 
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'; 
import { makeExecutableSchema } from '@graphql-tools/schema'; 
import { WebSocketServer } from 'ws'; 
import { useServer } from 'graphql-ws/use/ws'; 
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; 
import express from 'express'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'; 
import { typeDefs } from './src/schema.js'; 
import { resolvers } from './src/resolvers.js'; 

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});