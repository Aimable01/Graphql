import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";

// server setup
const server = new ApolloServer({
  typeDefs,
  // resolvers
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(` 🚀 Server up on port 4000 `);
