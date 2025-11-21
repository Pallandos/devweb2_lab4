import { createServer } from 'http'; 
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'; 
import { makeExecutableSchema } from '@graphql-tools/schema'; 
import { WebSocketServer } from 'ws'; 
import { useServer } from 'graphql-ws/use/ws'; 
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; 
import express from 'express'; 
import cors from 'cors'; 
// On utilise express.json() natif, plus besoin de body-parser
import { typeDefs } from './src/schema.js'; 
import { resolvers } from './src/resolvers.js'; 

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// --- Configuration WebSocket ---
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

// --- Configuration Apollo Server ---
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

// --- ROUTE ET MIDDLEWARES ---

app.use(
  '/graphql',
  cors(), // 1. Gère les permissions cross-origin
  express.json(), // 2. Parse le JSON si le header est présent
  
  // 3. --- CORRECTIF DE SÉCURITÉ ---
  // Ce middleware s'assure que req.body n'est jamais 'undefined'
  // pour éviter le crash d'Apollo si le client oublie le header JSON
  (req, res, next) => {
    if (!req.body) req.body = {};
    next();
  },
  
  expressMiddleware(server), // 4. Apollo Server
);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});