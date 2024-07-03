import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import _db from "./_db.js";

import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    // all items
    games() {
      return _db.games;
    },
    reviews() {
      return _db.reviews;
    },
    authors() {
      return _db.authors;
    },

    // single item
    review(_, args) {
      return _db.reviews.find((rev) => rev.id === args.id);
    },
    game(_, args) {
      return _db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return _db.authors.find((auth) => auth.id === args.id);
    },
  },

  // relations
  Game: {
    reviews(parent) {
      return _db.reviews.filter((rev) => rev.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return _db.reviews.filter((rev) => rev.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return _db.authors.find((auth) => auth.id === parent.author_id);
    },
    game(parent) {
      return _db.games.find((game) => game.id === parent.game_id);
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
