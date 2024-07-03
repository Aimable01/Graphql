import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import _db from "./_db.js";

import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return _db.games;
    },
    reviews() {
      return _db.reviews;
    },
    authors() {
      return _db.authors;
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`
        🚀 Server up on port 4000 
        📪 http://localhost:4000
`);
