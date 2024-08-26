const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema/type-defs");
const resolvers = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = jwt.verify(token, "secret-word");
      return { user };
    } catch (error) {
      return {};
    }
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`
        🚀 Server is running
        💻 Live at ${url}
        `);
  })
  .catch((e) => {
    console.log(`An error in starting server: ${e}`);
  });
