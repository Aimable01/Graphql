const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { name: "pedro" };
  },
});

server.listen().then(({ url }) => {
  console.log(`
        🚀 Server is running
        💻 Live at ${url}
    `);
});
